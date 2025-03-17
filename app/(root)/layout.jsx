import NavBar from "@/components/navbar";
export default function RootLayout({ children,}) {
  return (<div>
    <NavBar/>
    {children}</div> );
}
