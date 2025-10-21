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
  Stay in the Loop with I0rd
</span>
<span className="text-darkGray font-Montserrat text-lg">
  Join our mailing list to stay updated on AI insights, 0G blockchain updates, trading strategies, and new token discoveries on I0rd. <br />
  Empower your crypto trading with decentralized tools
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