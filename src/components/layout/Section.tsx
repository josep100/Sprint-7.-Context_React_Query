

const Section = ({classname, children}: {classname: string, children: React.ReactNode}) => {
     return(
        <section className={classname}>
            {children}
        </section>
     )
}

export default Section;