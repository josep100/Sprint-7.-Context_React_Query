import Section from "./Section";

const ContainerMovies = ({children}: {children: React.ReactNode}) => {
     return(
        <div className="container mx-auto py-7">
            <Section classname = {"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"}>
               {children}
            </Section>
        </div>
     )
}

export default ContainerMovies;