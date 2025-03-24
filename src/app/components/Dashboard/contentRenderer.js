import React from 'react';
import EmployeesContent from '../EmployeesContent';
import DepartmentsContent from '../DepartmentsContent';
import PositionsContent from '../PositionsContent';
import LeaveContent from '../Leave/LeaveContent';
import HolidaysContent from '../Holidays/HolidaysContent';
import ReportsContent from '../ReportsContent';
import UserManagementContent from '../UserManagementContent';
import LeaveReportContent from '../LeaveReport/LeavereportContent';

const renderContent = (pathname) => {
  switch (pathname) {
    case '/employees':
      return <EmployeesContent />;
    case '/departments':
      return <DepartmentsContent />;
    case '/positions':
      return <PositionsContent />;
    case '/leave':
      return <LeaveContent />;
    case '/holidays':
      return <HolidaysContent />;
    case '/reports':
      return <ReportsContent />;
    case '/reports/leave-report':
      return <LeaveReportContent />;
    case '/user-management':
      return <UserManagementContent />;
    default:
      return <EmployeesContent />; // Default to employees content
  }
};

export default renderContent;