import { Button } from '../../components/common/Button/Button';
import { Images } from '../../environment'; // Fixed typo from 'envaironmnet'

const Mailing: React.FC = () => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center mx-auto"
      style={{ backgroundImage: `url(${Images.Background3})` }} // Fixed missing closing parenthesis
    >
      <div className="max-w-screen-lg md:pt-60 pt-12 md:mx-auto mx-4">
        <div className="flex flex-col">
          <span className="text-darkGray font-Montserrat text-5xl font-bold mb-5">
            Stay in the loop
          </span>
          <span className="text-darkGray font-Montserrat text-lg">
            Join our mailing list to stay in the loop with <br />
            our newest feature releases, NFT drops, and <br />
            tips and tricks for navigating NFT.Ring
          </span>
        </div>
        <div className="pb-24 mt-12">
          <input
            type="email"
            className="py-2 border rounded-xl text-orange1 border-white outline-none pr-5"
            placeholder="Enter your email"
          />
          <Button
            title="Register"
            className="bg-gradient-to-r from-orange1 to-orange2 md:-ml-4 md:mt-0 mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Mailing;