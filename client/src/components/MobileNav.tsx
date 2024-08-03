"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const { isLoggedIn, logout, user } = useAuthContext();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const redirect = isLoggedIn ? "/studenti" : "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {isLoggedIn ? (
          <>
            <DropdownMenuGroup>
              <Link href="/studenti">
                <DropdownMenuItem>Studenți</DropdownMenuItem>
              </Link>
              <Link href="/materii">
                <DropdownMenuItem>Materii</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuSeparator />
            <Link href="/login">
              <DropdownMenuItem>Intră în cont</DropdownMenuItem>
            </Link>
            <Link href="/register">
              <DropdownMenuItem>Cont nou</DropdownMenuItem>
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Ieși din cont
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
