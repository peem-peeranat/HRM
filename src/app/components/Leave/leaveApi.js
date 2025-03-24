import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';

export const fetchReasonOptions = async (setReasonOptions) => {
  const token = Cookies.get("token");
  try {
    const response = await fetch('http://localhost:1337/api/content-type-builder/content-types/api::leave.leave', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.data && data.data.schema && data.data.schema.attributes) {
      const reasonEnum = data.data.schema.attributes.reason.enum;
      setReasonOptions(reasonEnum);
    }
  } catch (error) {
    console.error('Error fetching schema:', error);
    toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูลเหตุผลการลา');
  }
};

export const submitLeave = async ({ startDate, endDate, reason, note, file, setStartDate, setEndDate, setReason, setNote, setFile }) => {
  const token = Cookies.get("token");

  if (!startDate) {
    toast.error('กรุณาเลือกวันที่เริ่มต้น', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }
  if (!endDate) {
    toast.error('กรุณาเลือกวันที่สิ้นสุด', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }
  if (!reason) {
    toast.error('กรุณาเลือกเหตุผลการลา', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  try {
    let fileId = null;

    if (file) {
      const fileFormData = new FormData();
      fileFormData.append('files', file);

      const fileResponse = await fetch('http://localhost:1337/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fileFormData,
      });

      const fileData = await fileResponse.json();
      if (fileData && fileData[0] && fileData[0].id) {
        fileId = fileData[0].id;
      }
    }

    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;

    const leaveResponse = await fetch('http://localhost:1337/api/leaves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          startDate: startDate,
          endDate: endDate,
          reason: reason,
          note: note,
          file: fileId ? [fileId] : undefined,
          users_permissions_user: userId,
          leaveStatus: "Pending Approval",
        },
      }),
    });

    const leaveData = await leaveResponse.json();
    console.log('Leave submitted:', leaveData);
    toast.success('ยื่นใบลาสำเร็จ!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setStartDate('');
    setEndDate('');
    setReason('');
    setNote('');
    setFile(null);
  } catch (error) {
    console.error('Error submitting leave:', error);
    toast.error('เกิดข้อผิดพลาดในการยื่นใบลา', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};