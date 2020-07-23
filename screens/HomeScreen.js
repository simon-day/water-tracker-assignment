import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import MinusIcon from '../assets/MinusIcon.svg';
import PlusIcon from '../assets/PlusIcon.svg';
import DrinkCarousel from '../components/DrinkCarousel';
import Body from '../components/Body';
import Dash from 'react-native-dash';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [dailyTarget, setDailyTarget] = useState();
  const [totalWaterDrunk, setTotalWaterDrunk] = useState(0);
  const [achievedGoalDays, setAchievedGoalDays] = useState(0);
  const [percentageFull, setPercentageFull] = useState('0%');
  const [drinkSize, setDrinkSize] = useState(150);
  const [inputVal, setInputVal] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const saveToStorage = (targetValue) => {
    AsyncStorage.setItem('dailyGoal', JSON.stringify(targetValue));
  };

  useEffect(() => {
    const getDailyGoal = async () => {
      const goal = await AsyncStorage.getItem('dailyGoal');
      if (!goal) {
        setDailyTarget(3500);
      } else {
        setDailyTarget(parseInt(JSON.parse(goal)));
      }
    };

    getDailyGoal();
  }, []);

  const getPercentageFull = () => {
    return `${(totalWaterDrunk / dailyTarget) * 100}%`;
  };

  const addDrink = () => {
    setTotalWaterDrunk((prevAmount) => prevAmount + drinkSize);
  };

  const removeDrink = () => {
    if (totalWaterDrunk < drinkSize) {
      setTotalWaterDrunk(0);
      return;
    }
    setTotalWaterDrunk((prevAmount) => prevAmount - drinkSize);
  };

  const updateDailyGoal = () => {
    setDailyTarget(inputVal);
    saveToStorage(inputVal);
    setModalVisible(!modalVisible);
    setInputVal('');
  };

  useEffect(() => {
    setPercentageFull(getPercentageFull());
  }, [dailyTarget, totalWaterDrunk]);

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={{ position: 'absolute', top: 16, right: 16 }}>
            <FontAwesome
              onPress={() => {
                setModalVisible(false);
                setInputVal('');
              }}
              name="close"
              size={20}
              color="#53BFEF"
            />
          </View>
          <Text style={styles.modalTitle}>Update Target Water</Text>
          <Text style={styles.modalText}>
            {`Please enter your new water \n target below:`}
          </Text>

          <TextInput
            onChangeText={(num) => {
              num = num.replace(/[^0-9]/g, '');
              if (num.length > 4) {
                return;
              }
              setInputVal(num);
            }}
            keyboardType="number-pad"
            value={inputVal}
            autoFocus
            textAlign="center"
            style={styles.textInput}
          />
          <Text style={styles.mlText}>ml</Text>
          <TouchableHighlight
            style={styles.updateButton}
            onPress={updateDailyGoal}
          >
            <Text style={styles.updateButtonText}>UPDATE</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      <View style={styles.topRowInfoContainer}>
        <View>
          <Text style={styles.topRowHeader}>{totalWaterDrunk / 1000} L</Text>
          <Text style={styles.topRowSubHeader}>{`TOTAL WATER \n DRUNK`}</Text>
        </View>
        <View>
          <Text style={styles.topRowHeader}>{achievedGoalDays}</Text>
          <Text style={styles.topRowSubHeader}>{`ACHIEVED GOAL \n DAYS`}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Body height={percentageFull} />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
            }}
          >
            <Dash
              dashColor="#088ECF"
              dashThickness={0.9}
              style={{
                zIndex: 10,
                marginLeft: 70,
                width: 90,
                opacity: 0.6,
              }}
            />
            <View>
              <TouchableOpacity
                style={styles.setGoalButton}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={styles.dailyTargetText}>
                  {(dailyTarget / 1000).toFixed(1)} L{' '}
                </Text>
                <FontAwesome5 name="pen" size={13} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.messageContainer}>
        {totalWaterDrunk >= dailyTarget && (
          <Text style={styles.goalCompleteText}>
            {`Nice work! Keep \n it up!`}
          </Text>
        )}
      </View>
      <View
        style={{
          height: '10%',
        }}
      >
        <DrinkCarousel setDrinkSize={setDrinkSize} />
      </View>
      <View style={styles.addOrRemoveContainer}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={removeDrink}>
            <MinusIcon width={60} height={60} style={{ marginRight: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={addDrink}>
            <PlusIcon width={60} height={60} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#53BFEF',
    flex: 1,
    alignItems: 'center',
  },
  topRowInfoContainer: {
    flex: 1,
    paddingTop: 40,
    width: '100%',
    paddingHorizontal: width / 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topRowHeader: {
    textAlign: 'center',
    fontSize: height < 760 ? 28 : 40,
    // fontFamily: 'roboto-bold',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  topRowSubHeader: {
    textAlign: 'center',
    fontSize: height < 760 ? 13 : 19,
    // fontFamily: 'roboto-regular',
    color: '#fff',
  },
  bodyContainer: {
    flex: 3,
    paddingLeft: 100,
    justifyContent: 'center',
    paddingTop: 60,
  },
  setGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -13,
  },
  dailyTargetText: {
    color: '#fff',
    fontWeight: 'bold',
    // fontFamily: 'roboto-medium',
    paddingLeft: 4,
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    color: '#53BFEF',
    fontSize: 18,
    // fontFamily: 'roboto-regular',
    borderColor: '#53BFEF',
    width: '80%',
    borderRadius: 10,
    height: 39,
    marginBottom: 10,
  },
  mlText: {
    fontSize: 18,
    color: '#53BFEF',
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    bottom: 100,
    right: width / 3.6,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
  },
  goalCompleteText: {
    color: '#fff',
    fontSize: height > 750 ? 23 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addOrRemoveContainer: {
    flex: 1,
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  modalView: {
    marginTop: 100,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 25,
    // fontFamily: 'roboto-bold',
    fontWeight: 'bold',
    color: '#53BFEF',
  },
  updateButton: {
    backgroundColor: '#53BFEF',
    borderRadius: 10,
    width: '80%',
    padding: 10,
    elevation: 2,
  },
  updateButtonText: {
    color: 'white',
    // fontFamily: 'roboto-bold',
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    fontSize: 15,
    marginBottom: 30,
    textAlign: 'center',
    // fontFamily: 'roboto-regular',
    color: '#53BFEF',
  },
});

export default HomeScreen;
