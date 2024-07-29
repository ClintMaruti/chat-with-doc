import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <ClerkLoaded>
      <div className="flex flex-col flex-1 h-screen">
        <Header />
        <main className="h-screen overflow-y-scroll">{children}</main>
      </div>
    </ClerkLoaded>
  );
}
