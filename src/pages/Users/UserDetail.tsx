import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectUserById, UserData } from "../../store/users";

const UserDetail = () => {
  const user: UserData = useSelector((state: any) =>
    selectUserById(state, state.users.selectedId)
  );

  const {
    name,
    company: { name: companyName },
    email,
    address: {
      street,
      suite,
      city,
      zipcode,
      geo: { lat, lng },
    },
    phone,
    username,
    website,
  } = user;
  const mapUrl =
    Platform.OS === "ios"
      ? `maps://app?saddr=${lat}+${lng}&daddr=${lat}+${lng}`
      : `google.navigation:q=${lat}+${lng}`;
  const telUrl = `tel:${phone}`;
  const url = `https://${website}`;

  return (
    <View
      style={{
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
      }}
    >
      <Text style={styles.boldText}>{name}</Text>
      <Text style={styles.normalText}>{companyName}</Text>
      <Text style={styles.boldText}>Contact Information</Text>
      <Text style={styles.normalText}>{email}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(mapUrl)}>
        <Text style={styles.normalText}>{street}</Text>
        <Text style={styles.normalText}>{suite}</Text>
        <Text style={styles.normalText}>{`${city} ${zipcode}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(telUrl)}>
        <Text style={styles.normalText}>{phone}</Text>
      </TouchableOpacity>
      <Text style={styles.boldText}>Other Information</Text>
      <Text style={styles.normalText}>{`User Name: ${username}`}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.normalText}>{`Website: ${website}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  boldText: {
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 9,
    marginTop: 9,
  },
  normalText: {
    fontSize: 21,
  },
});
