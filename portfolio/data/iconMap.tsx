import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSharp, SiCplusplus, SiAmazon, SiDocker, SiPython, SiMysql, SiPostgresql, SiMongodb } from "react-icons/si";
import { ReactElement } from "react";

export const iconMap: Record<string, ReactElement> = {
  react: <SiReact color="#fff" />,
  nextjs: <SiNextdotjs color="#fff" />,
  typescript: <SiTypescript color="#fff" />,
  tailwindcss: <SiTailwindcss color="#fff" />,
  csharp: <SiSharp color="#fff" />,
  cplusplus: <SiCplusplus color="#fff" />,
  aws: <SiAmazon color="#fff" />,
  docker: <SiDocker color="#fff" />,
  reactnative: <SiReact color="#fff" />,
  python: <SiPython color="#fff" />,
  mysql: <SiMysql color="#fff" />,
  postgresql: <SiPostgresql color="#fff" />,
  mongodb: <SiMongodb color="#fff" />,
};
