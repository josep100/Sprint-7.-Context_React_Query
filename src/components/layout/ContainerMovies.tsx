import Section from "./Section";

const ContainerMovies = ({children}: {children: React.ReactNode}) => {
     return(
        <div className="container mx-auto">
            <Section classname = {"grid lg:grid-cols-5"}>
               {children}
            </Section>
        </div>
     )
}

export default ContainerMovies;