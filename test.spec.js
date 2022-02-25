describe("<App />", () => {
    it("should render App", () => {
     const wrapper = shallow(<App />);
     console.log(wrapper.debug());
    });
   });