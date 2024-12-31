import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from './shared/Layout.jsx';
import { Index } from "./Index.jsx";
import { About, Devs } from "./About.jsx";
import { AddAttendance, Attendance, TrainFR } from "./components/Attendance.jsx";
import { CreateDepartment, Department, Student, StudentsList, Subject, Teacher, TeachersList, UpdateDepartment } from "./components/Departments.jsx";
import { AddPermission, BindPermission } from "./components/Permissions.jsx";
import { Register as RegisterProject, Status, Project, CreatePhase } from "./components/Project.jsx";
import { AddRoles, Roles,  UpdateRoles } from "./components/Roles.jsx";
import { AddSkill, AddSkillSet, SkillSet, UpdateSkill, UpdateSkillSet } from "./components/Skillset.jsx";
import { AddUserSkill } from "./components/Skills.jsx";
import { Login, Profile, Register, UpdatePassword, UpdateProfile, User, GetMyRequests, GetRequests, SetUserRole } from "./components/User.jsx";
import { Admin } from "./Admin.jsx";
import PageNotFound from "./shared/NotFound.jsx";

function App() {
    return (
        <>
        <div className='w-full h-full flex flex-col'>
            <Router>
                <div className='w-full h-1/12 p-2 flex flex-row bg-cyan-400 border border-solid border-black'>
                    <Header />
                </div>
                <div className='w-full flex grow'>
                    <Routes>
                        <Route path="/" index element={<Index />} />
                        <Route path="About" element={<About />}>
                            <Route path="College" element={null}/>
                            <Route path="Principal" element={null}/>
                            <Route path="HODs" element={null}/>
                            <Route path="Professors" element={null}/>
                            <Route path="Developers" element={<Devs />}/>
                        </Route>
                            
                        <Route path="Register" element={<Register />} />
                        <Route path="Login" element={<Login />} />
                        <Route path="Admin" element={<Admin />} />

                        <Route path="User" element={<User />} >
                            <Route path="" element={<Profile />} />
                            <Route path="UpdateProfile" element={<UpdateProfile />} />
                            <Route path="UpdatePassword" element={<UpdatePassword />} />
                            <Route path="Roles">
                                <Route path="SetUserRole" element={<SetUserRole />}/>
                                <Route path="GetMyRequests" element={<GetMyRequests />}/>
                                <Route path="GetRequests" element={<GetRequests />}/>
                            </Route>
                            <Route path="Skills" >
                                <Route path="Add" element={<AddUserSkill />}/>
                            </Route>
                        </Route>
                        <Route path="Attendance" element={<Attendance />} >
                            <Route path="Add" element={<AddAttendance/>} />
                            <Route path="Train" element={<TrainFR/>} />
                        </Route>
                        <Route path="Project" element={<Project />} >
                            <Route path="Register" element={<RegisterProject/>} />
                            <Route path="CreatePhase" element={<CreatePhase />} />
                            <Route path="Status" element={<Status />} />
                        </Route>

                        <Route path="Department" element={<Department />} >
                            <Route path="Create" element={<CreateDepartment />} /> 
                            <Route path="Update" element={<UpdateDepartment />} /> 
                            <Route path="Subject" element={<Subject />} />
                            <Route path="Teacher/Register" element={<Teacher />} />
                            <Route path="Teacher/List" element={<TeachersList />} />
                            <Route path="Student/Register" element={<Student />} />
                            <Route path="Student/List" element={<StudentsList />} />
                        </Route>
                        
                        <Route path="Roles" element={<Roles />} >
                            <Route path="Add" element={<AddRoles />}/>
                            <Route path="Update" element={<UpdateRoles />}/>
                            <Route path="Permissions" >
                                <Route path="Add" element={<AddPermission />} />
                                <Route path="Bind" element={<BindPermission />} />
                            </Route>
                        </Route>
                        <Route path="Skillset" element={<SkillSet />} >
                            <Route path="Add" element={<AddSkillSet />} />
                            <Route path="Update" element={<UpdateSkillSet/>} />
                            <Route path="Skills" >
                                <Route path="Add" element={<AddSkill/>} />
                                <Route path="Update" element={<UpdateSkill/>} />
                            </Route>
                        </Route>
                        <Route path='*' element={<PageNotFound />} />
                        
                    </Routes>
                </div>
            </Router>
        </div>
        </>
    );
}

export default App;