import Comics from '@/components/Comics';
import Menu from '@/components/Comics/Menus';
import { Categories } from '@/components/Comics/MenusData';
export default function CategoriesPage() {
  return (
    <div className='mt-20 pb-6'>
      <Menu menus={Categories} />
      <Comics title='' />
    </div>
  );
}
