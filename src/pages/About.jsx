import React from "react";
import parajImg from "../assets/paraj.jpg"; // Replace with your own image path
import githubIcon from "../assets/Github.png"; // Replace with your GitHub icon path
import instagramIcon from "../assets/Instagram.png"; // Replace with your Instagram icon path

const AboutMe = () => {
  return (
    <div className="w-full h-[1000px] flex flex-col items-center bg-gray-900 text-white pt-5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0 w-48 md:w-72">
              <img
                src={parajImg}
                alt="Paraj's Photo"
                className="rounded-full w-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Hey, I'm Paraj!</h2>
              <p className="text-lg mb-4">
                I'm a final-year Computer Science student at Ahmedabad University.
                I recently completed a Teaching Assistant internship at Coding Ninjas.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/Reqzonee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-green-300 transition duration-300 ease-in-out"
                >
                  {/* <img
                    src={githubIcon}
                    alt="GitHub Icon"
                    className="w-6 h-6 mr-2"
                  /> */}
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/paraj.bhatt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-green-300 transition duration-300 ease-in-out"
                >
                  {/* <img
                    src={instagramIcon}
                    alt="Instagram Icon"
                    className="w-6 h-6 mr-2"
                  /> */}
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
