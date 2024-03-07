import { Icon } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
export default function ContactView() {
  return (
    <div className=" w-full text-primary-400">
      <h1 className="font-bold text-2xl underline">IMAM DROUBI</h1>
      <div className="my-2 flex items-center ">
        <EmailIcon />
        <a
          href="mailto:'imam.droubi@gmail.com'"
          className="text-gray-100 hover:underline"
        >
          imam.droubi@gmail.com
        </a>
      </div>
      <div className="my-2 flex items-center ">
        <GitHubIcon />
        <a
          href="https://github.com/ImamDroubi"
          className="text-gray-100 hover:underline"
        >
          /ImamDroubi
        </a>
      </div>
      <div className="my-2 flex items-center ">
        <LinkedInIcon />
        <a
          href="https://www.linkedin.com/in/imamdroubi/"
          className="text-gray-100 hover:underline"
        >
          /imamdroubi/
        </a>
      </div>
    </div>
  );
}
