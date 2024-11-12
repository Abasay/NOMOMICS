import Comics from '@/components/Comics';
import Menu from '@/components/Comics/Menus';
import { library } from '@/components/Comics/MenusData';
export default function CategoriesPage() {
  return (
    <div className='min-h-screen pb-6 flex flex-col items-center justify-center'>
      <Menu menus={library} />
      <Comics title='' />
    </div>
  );
}
