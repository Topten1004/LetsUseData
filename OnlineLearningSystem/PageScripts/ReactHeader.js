/**
 * By: Hannan Abid
 * React Header to utilize states and load breadcrumbs
 * Based on original logout.html and logout.js
 */

/**
 * @description Render each breadcrumb
 * @param {any} props - Contains list of breadcrumbs
 */
const Breadcrumbs = (props) => {
    const { breadcrumbs } = props;
    return (
        <section id="breadcrumb-section">
            <div className="container">
                <div className="col-sm-12">
                    <nav className="" aria-label="breadcrumb" >
                        <ol className="breadcrumb" style={{ backgroundColor: "transparent" }}>
                            {breadcrumbs.map((crumb, index) => {
                                let active = "";
                                let currentPage = false;

                                if (index === breadcrumbs.length - 1) {
                                    active = "active";
                                    currentPage = true;
                                }
                                return (
                                    <li
                                        className={`breadcrumb-item ${active}`}
                                        key={crumb.name}
                                    >
                                        {/*Prevent current page from having a link*/}
                                        {currentPage ? (
                                            <React.Fragment>
                                                {crumb.name}
                                            </React.Fragment>
                                        ) : (
                                            <a href={crumb.link}>
                                                { crumb.name}
                                            </a>
                                        )}
                                    </li>
                                )
                            })}
                        </ol>
                    </nav>
                </div>
            </div>
        </section>
    )
}

/**
 * Header react component for rendering the header of the page
 * 
 * */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: "Content/images/photo.jpg",
            profileLink: "#",
            calendarLink: "#",
            feedbackLink: null,
            studentName: "Student Name",
            breadcrumbs: []
        }

        this.loadCrumbs = this.loadCrumbs.bind(this);
    }


    //Load breadcrumbs for current page
    async loadCrumbs() {
        const crumbs = await GetBreadCrumbs(); //Function in Global.js
        
        this.setState({
            breadcrumbs: crumbs
        })
    }


    componentDidMount() {
        this.loadCrumbs();

        var imageSrc = localStorage.getItem("StudentProfileImage");
        //Update profile image if one exists
        if (imageSrc != "") {
            this.setState({
                profileImg: imageSrc
            })
        }

        //Populate with student information and links
        this.setState({
            studentName: localStorage.getItem("StudentName"),
            profileLink: GetUrlClean("UpdateProfile.html"),
            //calendarLink: GetUrlClean("Calendar.html")
            calendarLink: GetUrlClean("Calendar.html", "courseInstanceId", GetFromQueryString("courseInstanceId"))
        })

        //Provide feedback button at page with moduleId
        if (GetFromQueryString("moduleId")) {
            this.setState({
                feedbackLink: GetUrlClean("Feedback.html", "courseInstanceId", GetFromQueryString("courseInstanceId"))

            })
        }


    }

    render() {

        return (
            <React.Fragment>
                <section className="header d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav className="navbar wow fadeInDown navbar-expand-lg navbar-light">
                                    <div className="container-fluid">
                                        <div className="nav-area-logo">
                                            <a href="CourseSelection.html">
                                                <img src="Content/images/lets-use-data-logo.svg" width="200" />
                                            </a>
                                        </div>
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-toggle" aria-controls="navbar-toggle" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbar-toggle">
                                            <ul className="navbar-nav  ml-auto">
                                                {/*Calender Link*/}
                                                <li className="nav-item">
                                                    <a className="nav-link" id="btnCalendar" href={this.state.calendarLink}>
                                                        Calendar
                                                        <span className="sr-only">(current)</span>
                                                    </a>
                                                </li>

                                                {/*Render feedBack only if valid link present*/}
                                                {this.state.feedbackLink ? (
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="btnComment" onClick={() => Feedback()} href={this.state.feedbackLink}>Feedback<span className="sr-only">(current)</span></a>
                                                    </li>
                                                ) : null}
                                                <li className="nav-item">
                                                    <a className="nav-link" id="btnContact" href="/Contact.html">
                                                        Contact
                                                        <span className="sr-only">(current)</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <hr className="navlinks_divider d-none d-lg-block" />
                                        <ul className="navbar-nav pull-right">
                                            <li className="dropdown d-flex align-items-center">
                                                <p className="user-name mr-4 d-none d-lg-block" id="top-bar-student-name">{this.state.studentName}</p>
                                                <a className="dropdown-toggle caret-none user-image" data-toggle="dropdown">
                                                    <img id="user-profile-image" src={this.state.profileImg} />
                                                </a>
                                                <ul className="dropdown-menu user-dropdown">
                                                    <li>
                                                        <p className="user-name d-lg-none d-md-block">Student Name</p>
                                                    </li>
                                                    <li>
                                                        <div className="dropdown-divider d-lg-none d-md-block"></div>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" id="ButtonUpdateProfile" href={this.state.profileLink}><i className="fa fa-user" aria-hidden="true"></i> Profile</a>
                                                    </li>
                                                    <li>
                                                        <div className="dropdown-divider"></div>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" id="btnLogout" href="LoggedOut.html">
                                                            <i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>


                        </div>

                    </div>

                </section>

                {/*Load BreadCrumbs component*/}
                <Breadcrumbs breadcrumbs={this.state.breadcrumbs} />

            </React.Fragment>
        )
    }

}

const domContainer = document.querySelector('#header');
ReactDOM.render(<Header />, domContainer);