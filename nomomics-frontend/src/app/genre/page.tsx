import Comics from '@/components/Comics';
import Menu from '@/components/Comics/Menus';
import { genres } from '@/components/Comics/MenusData';
export default function GenresPage() {
  return (
    <div className=' mt-20 pb-6 flex flex-col items-center justify-center'>
      <Menu menus={genres} />
      <Comics title='' />
    </div>
  );
}
