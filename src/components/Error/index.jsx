
import { IoWarning } from 'react-icons/io5';

const Error = ({info, retry}) => {
  return (
    <div className='col-span-3 w-full flex flex-col gap-6 md:-w-[500px] '>
      <div className='bg-red-500 p-5 rounded-md flex items-center gap-4'>
        <IoWarning className='text-4xl'/>
<div>Üzgünüz Bir Hata Oluştu
<p>{info}</p>
</div>
      </div>

      <button onClick={retry} className=' border text-gray-600 transition hover:bg-gray-100 p-2 rounded-md'>Tekrar Dene</button>
    </div>
  );
}

export default Error;
