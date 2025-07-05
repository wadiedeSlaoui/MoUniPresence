/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import ReportComponent from "components/report/ReportComponent";
import StudentList from "studentlist/Studentlist";
import listeUser from "listeUser/listeUser"
import ListExam from "ListExam/ListExam"; 
import ReportList from "ReportList/ReportList";

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Créer un profile",
    icon: "nc-icon nc-simple-add",
    component: UserProfile,
    layout: "/admin"
  },
 {
    path: "/report",
    name: "Rapport",
    icon: "nc-icon nc-paper-2",
    component: ReportComponent,
    layout: "/admin"
  },
  {
      path: "/studentlist",
    name: "Liste des étudiants",
    icon: "nc-icon nc-notes",
    component: StudentList,
    layout: "/admin"
  },
 {
    path: "/listeUser",
    name: "liste des utilisateurs",
    icon: "nc-icon nc-badge",
    component: listeUser,
    layout: "/admin"
  },
   {
    path: "/ListExam",
    name: "liste des exams",
    icon: "nc-icon nc-bullet-list-67",
    component: ListExam,
    layout: "/admin"
  },
     {
    path: "/ReportList",
    name: "liste des rapports",
    icon: "nc-icon nc-align-left-2",
    component: ReportList,
    layout: "/admin"
  },
/*  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  }*/
];

export default dashboardRoutes;
