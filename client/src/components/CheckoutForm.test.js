import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import App from '../App'
import { act } from "react-dom/test-utils";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<App />)
    const header = screen.getByText(/React Plants/i)

});

describe("form shows success message on submit with form details", () => {
    test('app renders without errors', () => {
        render(<App />)
    })
    test('User can fill out forms and submit successfully', async() => {
        act(() => {
            render(<CheckoutForm />)
        })
        const firstNameInput = screen.getByLabelText(/First Name/i)
        const lastNameInput = screen.getByLabelText(/Last Name/i)
        const addressInput = screen.getByLabelText(/Address/i)
        const cityInput = screen.getByLabelText(/City/i)
        const stateInput = screen.getByLabelText(/State/i)
        const zipInput = screen.getByLabelText(/Zip/i)
        const button = screen.getByTestId(/submit/i)

        fireEvent.change(firstNameInput, {target:{name:'firstName', value:'Michael'}})
        fireEvent.change(lastNameInput, {target:{name:'lastName', value:'Hill'}})
        fireEvent.change(addressInput, {target:{name:'address', value:'733 Coleman St SE'}})
        fireEvent.change(cityInput, {target:{name:'city', value:'Grand Rapids'}})
        fireEvent.change(stateInput, {target:{name:'state', value:'MI'}})
        fireEvent.change(zipInput, {target:{name:'zip', value:'49508'}})

        fireEvent.click(button)

        const newSuccessMessage1 = await screen.findByText(/You have ordered some plants! Woo-hoo!/i)
        const newSuccessMessage2 = await screen.findByText(/Your new green friends will be shipped to/i)
        const newCust = await screen.findByText(/Michael Hill/i)
        const newAddress = await screen.findByText(/733 Coleman St SE/i)
        const newAddress1 = await screen.findByText(/Grand Rapids, Mi 49508/i)


    })


});
