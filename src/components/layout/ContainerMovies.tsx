import Section from "./Section";
import LogoutButton from "@/features/auth/component/Logout";

const ContainerMovies = ({children}: {children: React.ReactNode}) => {
     return(
        <div className="container mx-auto py-7">
            <header className="flex justify-center md:justify-end mb-4">
               <LogoutButton />
            </header>
            <Section classname = {"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"}>
               {children}
            </Section>
        </div>
     )
}

export default ContainerMovies;