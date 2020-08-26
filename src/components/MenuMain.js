import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, CardSection, Button, Confirm } from './common';
import MenuItem from './MenuItem';


class MenuMain extends Component {

    render() {
        return (
            <ScrollView>
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </ScrollView>
        );
    }
}

export default MenuMain;
