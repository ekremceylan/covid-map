import { FaVirusCovid } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Form from "./Form";

const Header = () => {
  return (
    <header className="flex bg-zinc-900 text-white p-5 md:px-20 justify-between items-center">
      <Link className="flex items-center gap-2" to="/">
        <FaVirusCovid className="text-green-500 text-xl" />
        <h1>COVID Takip</h1>
      </Link>

      <Form />
      <div>
        <p>
          <span className="flex flex-col text-sm">Bugün Aşı Olanlar</span>
          <span className="text-gray-400 text-sm">
            ({Math.floor(Math.random() * (60000 - 10000 + 1)) + 10000})
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
