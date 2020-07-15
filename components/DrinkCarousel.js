import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Text, View, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

class DrinkCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          amount: 150,
        },
        {
          amount: 250,
        },
        {
          amount: 350,
        },
        {
          amount: 450,
        },
      ],
    };
  }

  _renderItem({ item }) {
    return (
      <View
        style={{
          borderRadius: 5,
          paddingTop: 10,
          height: 150,
          textAlign: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            fontSize: height > 700 ? 25 : 20,
            fontFamily: 'roboto-bold',
            color: '#fff',
          }}
        >
          {`${item.amount} ml`}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <Carousel
        layout={'default'}
        ref={(ref) => (this.carousel = ref)}
        data={this.state.carouselItems}
        sliderWidth={300}
        itemWidth={100}
        renderItem={this._renderItem}
        onSnapToItem={(index) => {
          this.setState({ activeIndex: index });
          this.props.setDrinkSize(this.state.carouselItems[index].amount);
        }}
      />
    );
  }
}

export default DrinkCarousel;
