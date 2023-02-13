import { useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  fetchUsers,
  selectAllUsers,
  UserData,
  setSelectedId,
} from "../../store/users";

const UserList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.users);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const openDetail = (userId: number) => {
    dispatch(setSelectedId(userId));
    navigation.navigate("details");
  };

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
      }}
    >
      {users.map((user: UserData, index: number) => {
        return (
          <TouchableOpacity
            onPress={() => {
              openDetail(user.id);
            }}
            key={user.id}
          >
            <View
              style={index % 2 === 0 ? styles.container : styles.containerOdd}
              key={user.id}
            >
              <View style={styles.dataContainer}>
                <View>
                  <Text style={styles.name}>{user.name}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.email}>{user.email}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  loader: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ff0000",
    paddingBottom: 12,
    paddingTop: 12,
  },
  containerOdd: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ff0000",
    paddingBottom: 12,
    backgroundColor: "#efefef",
    paddingTop: 12,
  },
  dataContainer: {
    flexDirection: "column",
  },
  infoContainer: {
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
  },
  email: {
    fontSize: 15,
  },
});
