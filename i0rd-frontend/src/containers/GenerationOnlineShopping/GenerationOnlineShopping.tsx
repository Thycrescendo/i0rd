import { Avatar } from '../../components/common/Avatar/Avatar';
import Image from 'next/image';
import { Images } from '../../environment';

interface Item {
  url: string;
  title: string;
}

interface NftItem {
  url: string;
  name: string;
  urlNftImage: string;
  urlAvatar: string;
  userName: string;
  price: string;
}

const GenerationOnlineShopping: React.FC = () => {
  const items: Item[] = [
    { url: Images.Round1, title: 'Blue Ring' },
    { url: Images.Round2, title: 'Purple Ring' },
    { url: Images.Round3, title: 'Red Ring' },
    { url: Images.Round4, title: 'Green Ring' },
  ];

  const nftItems: NftItem[] = [
    {
      url: Images.RingItem1,
      name: 'Theresa Webb',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User2,
      userName: 'Darrell Steward',
      price: '$475.22',
    },
    {
      url: Images.RingItem2,
      name: 'Eleanor Pena',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User1,
      userName: 'Cody Fisher',
      price: '$850.22',
    },
    {
      url: Images.RingItem3,
      name: 'Darlene Robertson',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User6,
      userName: 'Esther Howard',
      price: '$1202',
    },
    {
      url: Images.RingItem4,
      name: 'Bessie Cooper',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User5,
      userName: 'Kristin Watson',
      price: '$860',
    },
    {
      url: Images.RingItem5,
      name: 'Guy Hawkins',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User4,
      userName: 'Marvin McKinney',
      price: '$900',
    },
    {
      url: Images.RingItem6,
      name: 'Savannah Nguyen',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User3,
      userName: 'Savannah Nguyen',
      price: '$1300',
    },
    {
      url: Images.RingItem7,
      name: 'Wade Warren',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User2,
      userName: 'Cody Fisher',
      price: '$1500',
    },
    {
      url: Images.RingItem8,
      name: 'Devon Lane',
      urlNftImage: Images.BlockChain2,
      urlAvatar: Images.User1,
      userName: 'Brooklyn Simmons',
      price: '$475',
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto mt-20">
      <div className="bg-lightGray md:mx-0">
        <div className="md:mx-0 mx-4">
          <div className="flex flex-col text-center mb-14">
            <span className="text-darkGray font-Montserrat text-5xl font-bold leading-normal">
              New Generation of <br />
              Decentralized Trading
            </span>
            <span className="text-darkGray font-Montserrat text-lg mt-6">
              I0rd addresses the centralization and high costs of traditional trading platforms like Binance, where users face limited control, hidden fees, and lack of personalized insights. <br />
              Built on 0G for scalable, AI-driven trading
            </span>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 pb-24">
            {items.map((item, index) => (
              <div
                className="flex flex-col items-center transform border rounded-3xl outline-none border-white cursor-pointer bg-gradient-to-r hover:bg-blue1 hover:scale-105 hover:text-white hover:from-orange1 hover:to-orange2"
                key={`${item.title}-${index}`}
              >
                <div className="mb-6">
                  <Image src={item.url} alt={item.title} width={200} height={200} />
                </div>
                <span className="text-3xl font-Montserrat font-bold mb-8">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col text-center mt-4 md:mx-0 mx-4 mb-14">
        <span className="text-darkGray font-Montserrat text-5xl font-bold leading-normal">
          AI-Powered Insights on I0rd
        </span>
        <span className="text-darkGray font-Montserrat text-lg mt-6">
          Leverage 0G&apos;s infrastructure for real-time market analysis and trading strategies, democratizing financial empowerment with transparent, on-chain AI solutions. <br />
          Trade, analyze, and discover tokens with community tools
        </span>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 m-auto">
        {nftItems.map((itemNft, index) => (
          <div
            className="flex flex-col justify-center border rounded-2xl border-white shadow-xl md:items-center md:mx-0 mx-auto mb-6 transform hover:scale-105 cursor-pointer"
            key={`${itemNft.name}-${index}`}
          >
            <div className="mb-5 flex justify-start">
              <Image src={itemNft.url} alt={itemNft.name} width={200} height={200} />
            </div>
            <div className="flex flex-col justify-center items-start pl-5 sm:pl-0">
              <div>
                <span className="text-lg font-Montserrat font-bold">{itemNft.name}</span>
              </div>
              <div className="flex mt-1.5">
                <Image src={itemNft.urlNftImage} alt="Blockchain" width={50} height={50} />
                <span className="text-orange3 text-2xl ml-4">{itemNft.price}</span>
              </div>
              <div className="flex items-center lg:mt-7 mt-2 mb-10">
                <Avatar src={itemNft.urlAvatar} />
                <span className="ml-4 text-base text-darkGray font-bold">{itemNft.userName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerationOnlineShopping;