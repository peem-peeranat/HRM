import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'HRM Menu',
  },
  {
    segment: 'employees',
    title: 'Employees',
    icon: <PeopleIcon />,
  },
  {
    segment: 'departments',
    title: 'Departments',
    icon: <BusinessIcon />,
  },
  {
    segment: 'positions',
    title: 'Positions',
    icon: <WorkIcon />,
  },
  {
    segment: 'leave',
    title: 'Leave Management',
    icon: <EventBusyIcon />,
  },
  {
    segment: 'holidays',
    title: 'Holidays',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <AssessmentIcon />,
    children: [
      {
        segment: 'employee-report',
        title: 'Employee Report',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'leave-report',
        title: 'Leave Report',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'user-management',
    title: 'User Management',
    icon: <SettingsIcon />,
  },
];

export default NAVIGATION;