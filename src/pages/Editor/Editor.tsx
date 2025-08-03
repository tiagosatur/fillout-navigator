import { Form } from '@/components/Form/Form';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navigator } from '@/components/Navigator/Navigator';

export const Editor = () => {
  return (
    <div className='flex h-screen'>
      <div className='hidden lg:block w-1/5 flex-shrink-0'>
        <Sidebar />
      </div>
      <div className='flex flex-col flex-1 h-screen p-3 overflow-hidden'>
        <div className='flex-1'>
          <Form />
        </div>
        <div className='footer h-20 bg-white'>
          <Navigator />
        </div>
      </div>
    </div>
  );
};
