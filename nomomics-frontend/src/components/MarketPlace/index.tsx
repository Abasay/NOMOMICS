'use client';
import { useState } from 'react';
import Card from './ComicCard';
import Modal from './ModalPopUp';
import { useComics } from '@/app/contexts/Comics';
import LoadingSkeleton from '../Comics/LoadingSkeleton';
import Button1 from '../Common/Button1';

const cards = Array.from({ length: 20 }, (_, index) => ({
  category: 'Drama',
  title: 'Tom and Jerry',
  price: '₦2,500',
  description:
    'Lorem ipsum dolor sit amet consectetur. Semper ornare sem vitae sed gravida lectus.',
  adminName: 'Nomomics',
  adminImage: './avatar.png',
  buttonText: 'Contact',
  imageUrl: './dummy.png',
}));

export default function MarketPlaceComics() {
  const { marketPlaceComics, loadingMarketPlaceComic } = useComics();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [active, setActive] = useState<string>('Nomomics');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handlePaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  if (loadingMarketPlaceComic) {
    return <LoadingSkeleton />;
  }

  return (
    <div className=' min-h-screen w-full p-6'>
      <div className=' my-4 mx-auto flex justify-center items-center gap-5'>
        {['Nomomics', 'Local Vendors'].map((elem) => (
          <span
            key={elem}
            className={`${
              elem === active
                ? 'font-semibold text-marketPlace text-lg'
                : 'text-lg '
            } cursor-pointer transition-all delay-0 ease-in-out duration-500 `}
            onClick={() => setActive(elem)}
          >
            {elem}
          </span>
        ))}
      </div>
      <div className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {marketPlaceComics.map((card, index) => (
          <Card key={index} {...card} onClick={() => handleCardClick(card)} />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedCard && (
          <div className=' mt-4'>
            <img
              src={selectedCard.coverImage}
              alt={selectedCard.title}
              className='w-full h-48 object-cover rounded mb-4'
            />
            <h2 className='text-2xl tracking-wider font-bold text-[#5C5A5A] mb-2'>
              {selectedCard.title}
            </h2>
            <div className='flex justify-between items-center'>
              {/* <span className='text-sm text-marketPlace font-medium'>
                {selectedCard.genre}
              </span> */}
              <span className='text-2xl font-semibold  text-[#101828]'>
                #{selectedCard.price}
              </span>
            </div>
            {/* Description Section */}
            <div className='mb-6 mt-3 pt-3 border-t-[2px] border-[#C3C3C3]'>
              <h3 className='text-base font-semibold text-[#101828] '>
                Description
              </h3>
              <p className='text-sm text-[#5C5A5A] mt-2 leading-6'>
                {selectedCard.synopsis.split(' ').slice(0, 30).join(' ')}
                {selectedCard.synopsis.split(' ').length > 30 ? '...' : ''}
              </p>
            </div>

            {/* Seller Details Section */}
            <div className='mb-6 mt-3 pt-3 border-t-[2px] border-[#C3C3C3]'>
              <h3 className='text-base font-semibold text-[#101828] '>
                Seller Details
              </h3>
              <div className='pt-1'>
                <p className='text-sm text-[#5C5A5A] mt-2 flex w-full items-center justify-between'>
                  <span className=' tracking-wider'>Name:</span>{' '}
                  <span className=' text-[#101828] font-semibold'>
                    {selectedCard.owner.fullName}
                  </span>
                </p>
                <p className='text-sm text-[#5C5A5A] mt-2 flex w-full items-center justify-between'>
                  <span className=' tracking-wider'>Contact Number:</span>{' '}
                  <a
                    href={`tel:${selectedCard.owner.phoneNumber}`}
                    className='text-blue-500 hover:underline font-semibold'
                  >
                    {selectedCard.owner.phoneNumber}
                  </a>
                </p>
                <p className='text-sm text-[#5C5A5A] mt-2 flex w-full items-center justify-between'>
                  <span className=' tracking-wider'>Location:</span>{' '}
                  <span className=' text-[#101828] font-semibold'>
                    {selectedCard.owner.location}
                  </span>
                </p>
              </div>
            </div>

            {/* Note Section */}
            <div className='flex items-start text-red-600 text-xs mt-4'>
              <span className='mr-2 font-bold text-lg'>&#8505;</span>
              <p className=' text-xs text-[#5C5A5A]'>
                In case where you need to meet the vendor, kindly meet in an
                open place like eatery, mall, etc.
              </p>
            </div>

            <div className=' min-w-fit mt-3 max-w-max mx-auto'>
              <Button1
                text='Pay Now'
                onClickFunc={handlePaymentModal}
                className=' bg-primary  px-5'
              />
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isPaymentModalOpen} onClose={handleCloseModal}>
        {selectedCard && (
          <form
            method='POST'
            action='https://checkout.flutterwave.com/v3/hosted/pay'
          >
            <div>Your order is #{selectedCard.price}</div>
            <input
              type='hidden'
              name='public_key'
              value='FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X'
            />
            <input
              type='hidden'
              name='customer[email]'
              value='test@mailnator.com'
            />
            <input
              type='hidden'
              name='customer[name]'
              value='Ayomide Jimi-Oni'
            />
            <input type='hidden' name='tx_ref' value='txref-81123' />
            <input type='hidden' name='amount' value={selectedCard.price} />
            <input type='hidden' name='currency' value='NGN' />
            <input type='hidden' name='meta[source]' value='docs-html-test' />
            <br />
            <button type='submit' id='start-payment-button'>
              Pay Now
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
