import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const useFcm = () => {
  const fcmState = useSelector((state: RootState) => state.fcm);
  
  return {
    fcmToken: fcmState.token,
    isPermissionGranted: fcmState.isPermissionGranted,
  };
};