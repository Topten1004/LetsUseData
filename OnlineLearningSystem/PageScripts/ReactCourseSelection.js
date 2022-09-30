/**
 * Returns each individual course card with progress, grade, and access button
 * @param {any} props
 * @requires course - The course object passed in as prop
 * @requires grade - The grade object for current course passed in as prop
 */

const CourseCard = props => {
    const { course, grade } = props;

    return (
        <div className="col-lg-4 col-md-6 mb-5">
            <div className="course-card">
                <div className="card">
                    {/*<!-- <img id="56CourseImage" src="Content/images/course-card-1.jpg" className="card-img-top" alt="Job Interview"> -->*/}

                    <div className="course-card-title">
                        {/*<!-- <h6 id="" className="card-title">
                           * Course
                        </h6>-->*/}
                        <h4
                            id={`${course.CourseInstanceId}CourseTitle`}
                            className="card-title"
                        >
                            {course.Name}
                        </h4>
                        <h5 className="card-title">
                            {course.Quarter}
                        </h5>
                    </div>

                    <div className="card-body">
                        {grade ? (
                            <React.Fragment>
                                <div className="position-relative">
                                    <div className="progress mb-2">
                                        <div
                                            id={`${
                                                course.CourseInstanceId
                                            }TotalCompletionProgressBar`}
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${
                                                    grade.TotalCompletion
                                                }%`
                                            }}
                                            aria-valuenow={`${
                                                grade.TotalCompletion
                                            }%`}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                        <span
                                            id={`${
                                                course.CourseInstanceId
                                            }totalCompletion`}
                                            className="progress-bar-percentage"
                                        >
                                            {grade.TotalCompletion}%
                                        </span>
                                    </div>
                                </div>
                                <hr className="card-body-divider" />
                                <div className="text-center">
                                    <div className="grade-gpa mt-2 d-flex justify-content-center">
                                        {/*<p>
                                            Grade:{" "}
                                            <span
                                                id={`${
                                                    course.CourseInstanceId
                                                    }totalGrade`}
                                            >
                                                {grade.TotalGrade}%
                                            </span>
                                        </p>*/}
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="position-relative">
                                    <div className="progress mb-2">
                                        <div
                                            id="LoadingCompletionProgressBar"
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
                                    </div>
                                </div>
                                    <hr className="card-body-divider" />
                                    <div className="text-center">
                                        <div className="grade-gpa mt-2 d-flex justify-content-center">
                                            {/* <p>
                                                Grade:{" "}
                                                <span
                                                    id={`${
                                                        course.CourseInstanceId
                                                        }totalGrade`}
                                                >
                                                    ...
                                            </span>
                                            </p>*/}
                                        </div>
                                    </div>
                            </React.Fragment>
                        )}

                        <div className="text-center">
                            <a
                                href={`CourseObjectives.html?&courseInstanceId=${
                                    course.CourseInstanceId
                                }`}
                            >
                                <input
                                    type="button"
                                    className="btn custom-primary-btn-sm mx-auto"
                                    value="Continue"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Searchable Student list
 * */
class AdminList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedStudent: { Name: "--Select One--" },
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.navigateStudent = this.navigateStudent.bind(this);
    }

    //Change change of selecting student
    handleChange = student => {
        this.setState({ selectedStudent: student });
    };

    //Navigate to selected student
    async navigateStudent() {
        if (!this.state.selectedStudent.Id) {
            return;
        }

        let { data } = this.props;
        data["Method"] = "NavigateStudent";
        data["SelectedStudentId"] = this.state.selectedStudent.Id;
        const {
            studentIdHash,
            error,
            StudentName,
            Picture
        } = await fetchFunction("Course", data);

        if (studentIdHash == "-1") {
            this.setState({ error: error });
            return;
        }

        //Set proper localStorage items to update to selected student
        localStorage.setItem("Hash", studentIdHash);
        localStorage.setItem("StudentName", StudentName);
        localStorage.setItem("StudentProfileImage", Picture);


        //Reload window for changes to take effect
        // TODO: When implemented with react, reload is not necessary. Use global states and page should rerender automatically. Global state should also be used in header in order for it to update properly
        window.location.reload(false);
    }

    render() {
        const { students } = this.props;

        if (students.length === 0) {
            return null;
        }

        return (
            <section
                className="Alice-blue-bg"
                id="StudentListSection"
            >
                <div className="container">
                    <div className="margin-left-right-20">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="student-card">
                                    <div
                                        className="row"
                                        id="pnlStudentDropDownlist"
                                    >
                                        <div className="col-md-2 margin-b-1-875">
                                            <label>Select Student</label>
                                        </div>
                                        <div className="col-md-4 margin-b-1-875">
                                            <Select
                                                id="ddlStuden"
                                                onChange={event =>
                                                    this.handleChange(event)
                                                }
                                                options={this.props.students}
                                                placeholder="--Select One --"
                                                getOptionValue={elem => elem["Id"]}
                                                getOptionLabel={elem => elem["Name"]}
                                                value={
                                                    this.state.selectedStudent
                                                }
                                            />
                                        </div>
                                        <div className="col-md-2 margin-b-1-875">
                                            {/*        <!--<input className="btn custom-primary-btn-xsm mx-auto" value="Continue" onclick="NavigateSelectedStudent()" />-->*/}
                                            {/*<!--<a href="#" className="btn custom-primary-btn-xsm mx-auto" onclick="NavigateSelectedStudent()">Continue</a>-->*/}
                                            <button
                                                className="btn custom-primary-btn-xsm mx-auto"
                                                onClick={() =>
                                                    this.navigateStudent()
                                                }
                                            >
                                                Continue
                                            </button>
                                        </div>
                                        {this.state.error ? (
                                            <div className="text-center mb-3">
                                                <label
                                                    id="lblMessage"
                                                    className="text-danger"
                                                >
                                                    {this.state.error}
                                                </label>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

/**
 * React CourseSelection component
 * */
class CourseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            courseList: null,
            studentList: null,
            gradesList: null
        };

        this.loadData = this.loadData.bind(this);
    }

    
    async fetchData(data) {
        return await fetchFunction("Course", data);
    }

    //Asynchrounously load data
    async loadData() {
        //Get values from local storage
        await this.setState({
            data: {
                IsAdmin: localStorage.getItem("IsAdmin"),
                AdminHash: localStorage.getItem("AdminHash"),
                Hash: localStorage.getItem("Hash"),
                StudentName: localStorage.getItem("StudentName"),
                StudentProfileImage: localStorage.getItem("StudentProfileImage")
            }
        });


        //Load student and course lists
        let data = await this.fetchData({ ...this.state.data, Method: "Get" });
        this.setState({
            courseList: data.CourseList,
            studentList: data.StudentList
        });


        //Load grade list for courses
        data = await this.fetchData({ ...this.state.data, Method: "Grades" });
        this.setState({
            gradesList: data.CourseList
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                {/*<!----------------------- page title section ----------------------->*/}
                {/*<section className="page-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>My Courses</h2>
                            </div>
                        </div>
                    </div>
                </section>*/}
                {/*<!----------------------- end page title section -------------------------->*/}

                {this.state.courseList ? (
                    <React.Fragment>
                        {/*-------------------------------Student List for Admin--------------------*/}
                        <AdminList
                            students={this.state.studentList}
                            changeCourseList={this.changeCourseList}
                            changeGradesList={this.changeGradesList}
                            reload={this.reload}
                            fetchData={this.fetchData}
                            data={this.state.data}
                        />
                        {/*--------------------------------End Student List for Admin ----------------*/}
                        {/*<!----------------------- start course card section --------------------------->*/}
                        <section className="page-content margin-t-3 Alice-blue-bg">
                            <div className="container">
                                <div className="row" id="pnlCourseCard">
                                    {this.state.courseList.map(
                                        (course, index) => {
                                            return (
                                                <CourseCard
                                                    key={
                                                        course.CourseInstanceId
                                                    }
                                                    course={course}
                                                    grade={
                                                        this.state.gradesList
                                                            ? this.state
                                                                  .gradesList[
                                                                  index
                                                              ]
                                                            : null
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </section>
                        {/*<!----------------------- end start course card section ----------------------->*/}
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                        {/*<!----------------------- start loader section ----------------------->*/}
                            {/*<div
                            id="loader-spinner"
                            className="loader-img loader-bg"
                            style={{ display: "block" }}
                        >
                            <img src="Content/images/Loder_Trancparent_bg.gif" />
                        </div>*/}
                            {/*<!----------------------- end loader section ----------------------->*/}
                        </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const domContainer = document.querySelector("#ReactCourseSelection");
ReactDOM.render(<CourseSelection />, domContainer);
