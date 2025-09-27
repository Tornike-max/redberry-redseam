import { useParams } from 'react-router-dom';
import { useGetProduct } from '../../hooks/useGetProduct';
import Spinner from '../../components/Spinner';

const Show = () => {
    const { id } = useParams();
    const {product,isPending} = useGetProduct(id!);

    if(isPending){
        return <Spinner />
    }

    console.log(product)
    return (
        <div className='w-full flex justify-center items-center flex-col mt-[30px] px-[100px]'>
            <h1 className='text-[14px] font-[300] leading-[100%] text-[#10151F] w-full text-start'>Listing / Product</h1>

            <div className='w-full grid grid-cols-2 mt-[49px] gap-[168px]'>
                <div className='w-[845px] flex items-start justify-start gap-[24px]'>
                    <div className='w-[121px] h-[842px] flex flex-col justify-start items-center gap-[9px]'>
                        {product?.images.map((img: string | undefined, index: number) => 
                            (
                                <div className="overflow-hidden relative" key={index}>
                                    <img src={img} alt={`Product Image ${index + 1}`} className='w-[121px] h-[161px] object-cover  rounded-[10px]'/>
                                    <div className="absolute inset-0 bg-black/4 group-hover:bg-black/10 transition-colors duration-300 rounded-[10px]" />
                                </div>
                            )
                        )}
                    </div>
                    <div className="overflow-hidden relative">
                        <img src={product.cover_image} className='w-[703px] h-[937px] object-cover'></img>
                        <div className="absolute inset-0 bg-black/4 group-hover:bg-black/10 transition-colors duration-300 rounded-[10px]" />
                    </div>
                </div>
                <div className='w-[704px] h-[907px] flex justify-start items-start flex-col'>
                    <div className='w-full flex justify-center items-start flex-col gap-[21px]'>
                        <h1 className='text-[32px] font-[600] text-[#10151F] leading-[100%]'>{product.name}</h1>
                        <p className='text-[32px] font-[600] text-[#10151F] leading-[100%]'>
                            <span>$</span>
                            <span>{product.price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show