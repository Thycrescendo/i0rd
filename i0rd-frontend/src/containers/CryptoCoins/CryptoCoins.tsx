import Link from 'next/link';
import { Images } from '../../environment'; // Fixed typo from 'envaironmnet'

const CryptoCoins: React.FC = () => {
  return (
    <div className="max-w-screen-lg m-auto bg-lightGray">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 mt-5 py-10 md:mx-0 mx-4">
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://bitcoin.org/en/" passHref>
            <img src={Images.Btc} alt="Bitcoin" className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://www.blockchain.com/" passHref>
            <img src={Images.Blockchain3} alt="Blockchain" className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://www.tether.to/" passHref>
            <img src={Images.Tether} alt="Tether" className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://shibatoken.com/" passHref>
            <img src={Images.Shiba} alt="Shiba Inu" className="target" />
          </Link>
        </div>
        <div className="flex items-center lg:justify-start justify-center cursor-pointer">
          <Link href="https://ethereum.org/en/" passHref>
            <img src={Images.Etherum} alt="Ethereum" className="target" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CryptoCoins;