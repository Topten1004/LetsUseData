/**
 * StatisticsTable function returns table that holds all the statistics
 * @param {any} props
 * @requires stats - the statisic object passed in as prop
 */
const StatisticsTable = props => {
    const { stats } = props;

    return (
        <table className="table table-bordered font-size-13 box-bg-white" style={{ border: "#dee2e6"}}>
            <thead>
                <tr>
                    <th />
                    <th style={{ width: "30%", textAlign: "center" }}>
                        Completion
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>
                        Weight
                    </th>
                    <th style={{ width: "15%", textAlign: "center" }}>Grade</th>
                    <th style={{ width: "15%", textAlign: "center" }}>Total</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(stats).map((key, index) => {
                    if (key !== "CourseName" && key !== "Total") {
                        return (
                            <Statistic
                                name={key}
                                key={key + index}
                                stats={stats[key]}
                            />
                        );
                    }
                })}
            </tbody>
        </table>
    );
};

/**
 * Statistic function returns statistics associated with the category passed in
 * @param {any} props
 * @requires name - The category name passed in as prop
 * @requries stats - The statisics object associated with the category passed as prop
 */
const Statistic = props => {
    const { name, stats } = props;

    return stats.Weight > 0 ? (
        <tr id={name + "Row"}>
            <td>{name}</td>
            <td>
                <div className="progress">
                    <div
                        id={name + "CompletionProgressBar"}
                        className="progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow="3"
                        style={{ width: `${stats.Completion}%` }}
                    />
                    <span
                        className="progress-bar-percentage"
                        id={name + "Completion"}
                    >
                        {stats.Completion}%
                    </span>
                </div>
            </td>
            <td className="text-center">
                <span id={name + "Weight"}>{stats.Weight}%</span>
            </td>
            <td className="text-center">
                <span id={name + "CurrentGrade"}>{stats.Grade}%</span>
            </td>
            <td className="text-center">
                <span id={name + "WeightedGrade"}>{stats.WeightedGrade}%</span>
            </td>
        </tr>
    ) : null;
};

/**
 * Module function returns individual module that belongs to an objective
 * @param {any} props
 * @requires courseID of the current course
 * @requires objectiveID of the objective this module belongs to
 * @requires module object
 * @requires grade object for this module
 */
const Module = props => {
    const { courseID, objectiveID, module, grade } = props;

    return (
        <div className="module-progress custom-border-light box-bg-white">
            <div className="row">
                <div className="col-md-6">
                    <h5 id={`${objectiveID}_${module.ModuleId}description`}>
                        {module.Description}
                    </h5>
                </div>
                <div className="col-md-6 text-right">
                    {/*<div className="grade-gpa">
                        <span
                            id={`${objectiveID}_${module.ModuleId}grade`}
                            className="font-sans-serif"
                        >
                            {" "}
                            {grade ? "Grade: " + grade.Percent + "%" : null}
                        </span>
                    </div>*/}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <p id={`${objectiveID}_${module.ModuleId}details`}>
                        {module.ModuleObjectives}
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 col-lg-3">
                    <span>Progress:</span>
                    {module.DueDate !== "" ? (
                        <span
                            id={`${objectiveID}_${module.ModuleId}dueDate`}
                            className="due-date"
                        >
                            Due: {module.DueDate}
                        </span>
                    ) : null}
                </div>

                <div className="col-md-12 col-lg-7 ">
                    <div className="progress">
                        {grade ? (
                            <React.Fragment>
                                <div
                                    id={`${objectiveID}_${
                                        module.ModuleId
                                        }strokeDashArray`}
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${grade.Completion}%` }}
                                    aria-valuenow={`${grade.Completion}%`}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                                <span
                                    id={`${objectiveID}_${
                                        module.ModuleId
                                        }completion`}
                                    className="font-sans-serif progress-bar-percentage"
                                >
                                    {grade.Completion}%
                                </span>
                            </React.Fragment>
                        ) : (
                                <div
                                    id="loadingProgressBar"
                                    className="bg-info progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    style={{
                                        width: "100%",
                                        height: "10px",
                                        position: "absolute"
                                    }}
                                    aria-valuenow="100"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            )}
                    </div>
                </div>

                <div className="col-md-12 col-lg-2 text-center">
                    <a
                        href={`ModulePage.html?courseInstanceId=${courseID}&moduleId=${
                            module.ModuleId
                            }`}
                    >
                        <input
                            type="button"
                            id={`${objectiveID}_${module.ModuleId}btnModule`}
                            className="btn btn-custom-round course-o-access-btn"
                            value="Access"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

/*
 *             <h5>Course Objective:</h5>
            <span
                id={`${objective.Id}Description`}
                className="display-block margin-b-1"
            >
                {objective.Description}
            </span>
 * 
 * 
 * 
 * /

/**
 * Objective function returns each individual course objective which contains modules
 * @param {any} props
 * @requires grades object passed as prop
 * @requires the objective to render passed as prop
 * @requires courseID of the course passed as prop
 */
const Objective = props => {
    const { objective, courseID, grades } = props;

    return (
        <div className="course-objective-area">
            <div id={`${objective.Id}pnlLayout`}>
                <meta charSet="utf-8" />
                <title />

                {objective.Modules.map((value, index) => {
                    return (
                        <Module
                            key={value.ModuleId}
                            module={value}
                            objectiveID={objective.Id}
                            courseID={courseID}
                            grade={grades ? grades[index] : null}
                        />
                    );
                })}
            </div>
        </div>
    );
};

/**
 * Announcement Function returns the announcement section of course objecitves page
 * @param {any} props
 * @requires announcement link passed as prop
 * @requires The first announcement object passed as prop
 */
const Announcement = props => {
    const { link, announcement } = props;

    return (
        <div className="wraper-area box-bg-white">
            <div className="row">
                <div className="col-md-6">
                    <h6>Announcement</h6>
                </div>
                <div className="col-md-6 text-right">
                    <a href={link} id="a_announcemnts">
                        <input
                            type="button"
                            id="ButtonAnnouncementList"
                            className="btn btn-custom-round btn-sm"
                            value="Announcement List"
                        />
                    </a>
                </div>
            </div>
            <span id="LabelAnnouncementTitle" className="label-header">
                {announcement.Title}
            </span>
            <span id="LabelPublishedDate" className="label-header-time">
                {announcement.PublishDate}
            </span>
            <div className="margin-bottom-10" />
            <span
                id="LabelAnnouncementDescription"
                className="label-anouncement"
            >
                {announcement.Description}
            </span>
        </div>
    );
};

/**
 * React component for Courseobjectives.html page
 *
 * */
class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            stats: null,
            grades: null,
            objectives: null,
            announcements: [],
            syllabusLink: "#",
            a_announcement: "#"
        };

        this.loadData = this.loadData.bind(this);
    }

    /**Asynchrounously load data needed for statistics, announcements, grades, and objectives
     */
    async loadData() {
        //Load courseID
        await this.setState({
            data: {
                CourseInstanceId: GetFromQueryString("courseInstanceId")
            }
        });

        //Load Statistics
        /*
        this.setState({
            stats: await fetchFunction("CourseStatistics", this.state.data)
        });
        */

        //Load Announcement
        /* TODO
        this.setState({
            announcements: await fetchFunction(
                "CourseAnnouncement",
                this.state.data
            )
        });
        */

        //Load Objectives
        this.setState({
            objectives: await fetchFunction("CourseObjective", {
                ...this.state.data,
                Method: "GetCourseObjective"
            })
        });

        //Load grades
        this.setState({
            grades: await fetchFunction("CourseObjective", {
                ...this.state.data,
                Method: "LoadGrades"
            })
        });
    }

    componentDidMount() {
        this.loadData();

        //Set appropriate syllabus and announcement links
        this.setState({
            syllabusLink: GetUrl("Syllabus.html")
        });
        this.setState({
            a_announcement: GetUrl("AnnouncementPage.html")
        });
    }

    render() {
        return (
            <React.Fragment>
                {/*<!--------------------------------Loader spinner ------------------------------------------>*/}
                {this.state.objectives ? null : (
                    <div
                        id="loader-spinner"
                        className="loader-img loader-bg"
                        style={{ display: "none" }}
                    >
                        <img src="Content/images/Loder_Trancparent_bg.gif" />
                    </div>
                )}
                {/*<!--==================================================================================-->*/}
                {/*<!------------------------------------------- page title section ----------------------->*/}
                {/*<section className="page-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>
                                    <span id="lblCourseTitle">
                                        {this.state.objectives
                                            ? this.state.objectives.Name
                                            : ""}
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>*/}
                {/* <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>
                                    <span id="lblCourseTitle">
                                        {this.state.objectives
                                            ? this.state.objectives.Name
                                            : ""}
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>*/}
                {/*<!-------------------------------------- end page title section ----------------------->*/}
                <section className="page-content Alice-blue-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="margin-l-r-1">
                                    <div className="margin-b-1">
                                        <a
                                            href={
                                                this.state
                                                    .syllabusLink
                                            }
                                            id="syllabusLink"
                                        >
                                            Syllabus
                                                    </a>
                                    </div>
                                   
                                    <div className="course-static-area" style={{ display:"none" }}>
                                        {/* <!-- -----------------------------calculate the students current and overall grade-------------------------------->*/}
                                        <div className="row">
                                            <div className="col-md-12 col-lg-6">
                                                {/* <h3>Summary</h3>*/}
                                                {this.state.stats ? (
                                                    <>
                                                        {/*<!--<h4>*/}
                                                        {/*<span id="lblCourseTitle"></span>*/}
                                                        {/*</h4>-->*/}
                                                        <span id="totalCurrentGrade">
                                                            Course Current
                                                            Grade:{" "}
                                                            {
                                                                this.state.stats
                                                                    .Total
                                                                    .CurrentGrade
                                                            }%
                                                        </span>
                                                        {/*    <!--&nbsp (GPA &nbsp-->*/}
                                                        <span
                                                            style={{
                                                                visibility:
                                                                    "hidden"
                                                            }}
                                                            id="totalCurrentGPA"
                                                        />
                                                        {/*    <!--)-->*/}
                                                        <br />
                                                        <span id="totalGrade">
                                                            Course Predicted
                                                            Grade:{" "}
                                                            {
                                                                this.state.stats
                                                                    .Total.Grade
                                                            }%
                                                        </span>
                                                        {/*  <!--&nbsp (GPA &nbsp-->*/}
                                                        <span
                                                            style={{
                                                                visibility:
                                                                    "hidden"
                                                            }}
                                                            id="totalGPA"
                                                        />
                                                        {/*<!--)-->*/}
                                                        <br />

                                                        {this.state.stats
                                                            .Total
                                                            .Completion == 100 ? (
                                                                <span id="totalCompletion">
                                                                    Completed
                                                                </span>
                                                            ) : (
                                                                <span id="totalCompletion">
                                                                    Progress:
                                                                    { " "}
                                                                    {
                                                                        this.state.stats
                                                                            .Total
                                                                            .Completion
                                                                    }%
                                                                </span>
                                                            )}

                                                        <br />
                                                    </>
                                                ) : null}

                                                <div className="course-objective-intro">
                                                    <a
                                                        href=""
                                                        style={{
                                                            visibility: "hidden"
                                                        }}
                                                    >
                                                        Start here
                                                    </a>
                                                    <br />
                                                    <a
                                                        href={
                                                            this.state
                                                                .syllabusLink
                                                        }
                                                        id="syllabusLink"
                                                    >
                                                        Syllabus
                                                    </a>
                                                    <br />
                                                </div>
                                            </div>
                                            {/* ---------------------------------------Individual Grade Component Table --------------------------------- */}
                                            <div
                                                className=" col-md-12 col-lg-6"
                                                style={{ position: "relative" }}
                                            >
                                                {this.state.stats ? (
                                                    <div
                                                        id="pnlOverallGrade"
                                                        className="overall-grade margin-b-1"
                                                    >
                                                        <div>
                                                            <StatisticsTable
                                                                stats={
                                                                    this.state
                                                                        .stats
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                        <div
                                                            id="loader-spinner-static-are"
                                                            className="loader-img"
                                                            style={{
                                                                diplay: "none",
                                                                position:
                                                                    "relative",
                                                                height: "auto"
                                                            }}
                                                        >
                                                            {/*<img
                                                                width="50"
                                                                src="Content/images/Loder_Trancparent_bg.gif"
                                                            />*/}
                                                        </div>
                                                    )}
                                            </div>
                                            {/*-----------------------------------END Individual Grade Component Table----------------------------------*/}
                                        </div>
                                    </div>

                                    {/*-------------------------------------Announcement-------------------------------*/}
                                    <div className="">
                                        <div
                                            id="PanelAnnouncement"
                                            sytle={{ display: "block" }}
                                            //className="margin-top-10 margin-bottom-30"
                                        >
                                            {this.state.announcements[0] ? (
                                                <Announcement
                                                    link={
                                                        this.state
                                                            .a_announcement
                                                    }
                                                    announcement={
                                                        this.state
                                                            .announcements[0]
                                                    }
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    {/*-----------------------------------------------------------------------------------*/}
                                    {/*----------------------------------Course Objectives-----------------------------*/}
                                    <div id="pnlPanel" /*className="margin-t-1"*/>
                                        {this.state.objectives
                                            ? this.state.objectives.CourseObjectiveList.map(
                                                (value, index) => {
                                                    return (
                                                        <Objective
                                                            key={value.Id}
                                                            objective={value}
                                                            courseID={
                                                                this.state
                                                                    .data
                                                                    .CourseInstanceId
                                                            }
                                                            grades={
                                                                this.state
                                                                    .grades
                                                                    ? this
                                                                        .state
                                                                        .grades[
                                                                        index
                                                                    ]
                                                                        .Modules
                                                                    : null
                                                            }
                                                        />
                                                    );
                                                }
                                            )
                                            : null}
                                    </div>
                                    {/*----------------------------------End Course Objectives-----------------------------*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector("#course_objectives");
ReactDOM.render(<Course />, domContainer);
