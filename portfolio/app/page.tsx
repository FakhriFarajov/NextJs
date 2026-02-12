import Image from "next/image";
import DecryptText from "../components/ui/decode-text";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <DecryptText text="Opera" />
    </main>
  );
}
