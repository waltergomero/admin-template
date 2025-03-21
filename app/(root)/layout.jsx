import NavBar from "@/components/navbar";
export default function RootLayout({ children,}) {
  return (
  <div>
      <NavBar/>
      <div className="pt-15">
        {children}
      </div>
    </div> );
}
