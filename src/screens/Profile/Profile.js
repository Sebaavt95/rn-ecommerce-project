import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Text from '../../components/Text';
import ImageSelector from './screens/ImageSelector';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import {
  useDeleteUserDataMutation,
  useGetProfileDataQuery,
} from '../../services/shop';
import colors from '../../global/colors';
import { clearUserData, saveUserLocations } from '../../features/authSlice';
import { useDeleteAccountMutation } from '../../services/auth';
import { deleteSession } from '../../db';
import styles from './styles';

const USER_ACTIONS_MODAL_MESSAGES = {
  closeSession: '¿Cerrar sesión?',
  deleteAccount: '¿Seguro deseas eliminar la cuenta?',
};

const Profile = ({ navigation }) => {
  const [modalState, setModalState] = useState({
    type: '',
    open: false,
  });
  const userData = useSelector(state => state.auth.user);
  const { data, isLoading, isError } = useGetProfileDataQuery(userData?.id);
  const [deleteAccount] = useDeleteAccountMutation();
  const [deleteUserData] = useDeleteUserDataMutation();

  const dispatch = useDispatch();

  const openModal = type => {
    setModalState({ type, open: true });
  };

  const logout = async () => {
    try {
      dispatch(clearUserData());
      deleteSession();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserData({ id: userData?.id });
      await deleteAccount({ token: userData?.token });
      logout();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isError) return;
    dispatch(saveUserLocations(data?.locations));
  }, [data]);

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loaderWrapper}>
            <Loader size="large" color="tertiary" />
          </View>
        ) : (
          <>
            <View style={styles.emailWrapper}>
              <Text type="bold" textAlign="center">
                {userData?.email}
              </Text>
            </View>
            {!data?.image ? (
              <View style={[styles.image, styles.defaultImage]}>
                <FontAwesome
                  name="user-circle-o"
                  size={90}
                  color={colors.primary}
                />
              </View>
            ) : (
              <Image
                source={{
                  uri: data?.image,
                }}
                resizeMode="cover"
                style={styles.image}
              />
            )}
          </>
        )}
        <ImageSelector />
        <Button
          width="60%"
          handlePress={() => navigation.navigate('addressList')}
        >
          <Text textAlign="center">Gestionar localización</Text>
        </Button>
        <View style={styles.sessionButtons}>
          <Button
            variant="info"
            width="60%"
            handlePress={() => openModal('closeSession')}
          >
            <Text textAlign="center">Cerrar sesión</Text>
          </Button>
          <Button
            variant="error"
            width="60%"
            handlePress={() => openModal('deleteAccount')}
          >
            <Text textAlign="center">Eliminar cuenta</Text>
          </Button>
        </View>
      </View>
      <Modal
        isOpen={modalState?.open}
        handleConfirm={
          modalState?.type === 'closeSession' ? logout : handleDeleteAccount
        }
        handleCancel={() => setModalState({ ...modalState, open: false })}
      >
        <Text textAlign="center">
          {USER_ACTIONS_MODAL_MESSAGES[modalState?.type]}
        </Text>
      </Modal>
    </>
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default Profile;
