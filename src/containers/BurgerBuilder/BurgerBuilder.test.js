import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/buildControls'
import React from 'react'

configure({ adapter: new Adapter() })

describe('<BurgerBuilder/>', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onResetTotalPrice={() => { }} fetchIngredients={() => { }} />)
    })
    it('should render <BuildControls/> if there are ingredients', () => {
        wrapper.setProps({ingredients:{salad:1}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})