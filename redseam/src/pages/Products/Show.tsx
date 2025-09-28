import { useParams } from 'react-router-dom';
import { useGetProduct } from '../../hooks/useGetProduct';
import Spinner from '../../components/Spinner';
import { useEffect, useState,type Key} from 'react';
import QuantityDropdown from '../../components/QuantityDropDown';
import { useForm } from 'react-hook-form';
import { useAddToCart } from '../../hooks/useAddToCart';
import ButtonSpinner from '../../components/ButtonSpinner';

type FormData = {
  color: string;
  size: string;
  quantity: number;
};

const Show = () => {
  const { id } = useParams();
  const { product, isPending } = useGetProduct(id!);
  const {addToCart,isPending:isAddingToCart} = useAddToCart()

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [coverImage, setCoverImage] = useState<string>('');
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');


  const { handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      color: '',
      size: '',
      quantity: 1,
    },
  });

  useEffect(() => {
    if (product) {
      const initialColor =
        product.color === 'Default' ? product.available_colors[0] : product.color;
      const initialIndex = product.available_colors.indexOf(initialColor);

      setSelectedColorIndex(initialIndex >= 0 ? initialIndex : 0);
      setCoverImage(product.images[initialIndex >= 0 ? initialIndex : 0]);
      setDisplayedImages(product.images);

      const initialSize = product.size || product.available_sizes[0];
      setSelectedSize(initialSize);

    setValue('color', initialColor);
    setValue('size', initialSize);
    setValue('quantity', 1);
      
    }
  }, [product, setValue]);

  if (isPending) return <Spinner />;

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    addToCart({product_id:product.id,...data})
  };

  const handleColorSelect = (color: string, index: number) => {
    setSelectedColorIndex(index);
    setCoverImage(product.images[index]);
    setValue('color', color);
  };

  const handleImageSelect = (img: string, index: number) => {
  const selectedColor = product.available_colors[index];
  setSelectedColorIndex(index);
  setCoverImage(img); 
  setValue('color', selectedColor);
};

  return (
    <div className="w-full flex justify-center items-center flex-col mt-[30px] px-[100px] pb-[110px]">
      <h1 className="text-[14px] font-[300] leading-[100%] text-[#10151F] w-full text-start">
        Listing / Product
      </h1>

      <div className="w-full grid grid-cols-2 mt-[49px] gap-[168px]">
        <div className="w-[845px] flex items-start justify-start gap-[24px]">
          <div className="w-[121px] h-[842px] flex flex-col justify-start items-center gap-[9px]">
            {displayedImages.map((img, index) => (
            <div className="overflow-hidden relative" key={index}>
                <img
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    className={`w-[121px] h-[161px] object-cover rounded-[10px] cursor-pointer
                    ${coverImage === img ? "ring-2 ring-[#E1DFE1] ring-offset-2" : ""}`}
                    onClick={() => handleImageSelect(img, index)}
                />
                <div className="absolute inset-0 bg-black/4 group-hover:bg-black/10 transition-colors duration-300 rounded-[10px] pointer-events-none" />
            </div>

            ))}
          </div>

          <div className="overflow-hidden relative">
            {coverImage ? (
                <img
                src={coverImage}
                className="w-[703px] h-[937px] object-cover rounded-[10px]"
                alt="Selected product"
                />
            ) : null}
            <div className="absolute inset-0 bg-black/4 group-hover:bg-black/10 transition-colors duration-300 rounded-[10px]" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[704px] h-[907px] flex flex-col justify-start items-start"
        >
          <div className="w-full flex flex-col gap-[21px]">
            <h1 className="text-[32px] font-[600] text-[#10151F] leading-[100%]">{product.name}</h1>
            <p className="text-[32px] font-[600] text-[#10151F] leading-[100%]">
              <span>$</span>
              <span>{product.price}</span>
            </p>
          </div>

          <div className="w-[382px] mt-[56px] flex flex-col gap-[16px]">
            <h2>Color: {product.available_colors[selectedColorIndex]}</h2>
            <div className="w-full flex items-center gap-[13px]">
              {product.available_colors.map((color: string, index: number) => {
                const colorValue = color === 'Navy Blue' ? 'navy' : color.replace(' ', '');
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleColorSelect(color, index)}
                    style={{ backgroundColor: colorValue }}
                    className={`w-[38px] h-[38px] rounded-full cursor-pointer border border-[#E1DFE1] ${
                      selectedColorIndex === index ? 'ring-2 ring-[#E1DFE1] ring-offset-2' : ''
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-[382px] flex flex-col gap-[16px] mt-[42px]">
            <h2>Size:</h2>
            <div className="w-full flex items-center gap-[13px]">
             {product.available_sizes.map((sz: string, index: Key | null | undefined) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => {
                    const sizeStr = sz !== undefined && sz !== null ? String(sz) : '';
                    setValue('size', sizeStr);
                    setSelectedSize(sizeStr);
                    }}
                    className={`w-[70px] h-[42px] rounded-[10px] cursor-pointer border border-[#E1DFE1] text-[16px] text-[#10151F] leading-[100%] font-[400] ${
                    selectedSize === String(sz) ? 'bg-[#F8F6F7]' : 'bg-none'
                    }`}
                >
                    {sz}
                </button>
                ))}
            </div>
          </div>

          <QuantityDropdown quantity={product.quantity} setValue={setValue} />

          <div className="w-full flex flex-col gap-[16px] mt-[56px]">
            <button
              type="submit"
              className="bg-[#FF4000] rounded-[10px] w-full flex items-center justify-center h-[59px] text-[18px] font-[500] leading-[100%] text-white cursor-pointer hover:shadow-md"
            >
                {isAddingToCart ? <ButtonSpinner /> : ''}
              Add to cart
            </button>
          </div>

          <div className="w-full flex justify-start items-start mt-[56px] gap-[16px] h-[1px] bg-[#E1DFE1]"></div>

          <div className="w-full flex flex-col mt-[56px] gap-[12px]">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-[20px] font-[500] leading-[100%] text-[#10151F]">Details</h2>
              <img src={product.brand.image} alt={product.brand.name} className="w-[109px] h-[61px]" />
            </div>
            <h2 className="text-[16px] font-[400] text-[#3E424A] leading-[100%]">{product.brand.name}</h2>
            <p className="font-[400] text-[#3E424A] text-[16px] pt-[19px]">{product.description}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Show;
