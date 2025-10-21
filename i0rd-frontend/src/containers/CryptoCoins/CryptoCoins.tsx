import Link from 'next/link';
import Image from 'next/image';
import { Images } from '../../environment';

const CryptoCoins: React.FC = () => {
  return (
    <div className="max-w-screen-lg m-auto bg-lightGray">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 mt-5 py-10 md:mx-0 mx-4">
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://bitcoin.org/en/" passHref>
            <Image src={Images.Btc} alt="Bitcoin" width={100} height={100} className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://www.blockchain.com/" passHref>
            <Image src={Images.Blockchain3} alt="Blockchain" width={100} height={100} className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://www.tether.to/" passHref>
            <Image src={Images.Tether} alt="Tether" width={100} height={100} className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://shibatoken.com/" passHref>
            <Image src={Images.Shiba} alt="Shiba Inu" width={100} height={100} className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://ethereum.org/en/" passHref>
            <Image src={Images.Etherum} alt="Ethereum" width={100} height={100} className="target" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CryptoCoins;