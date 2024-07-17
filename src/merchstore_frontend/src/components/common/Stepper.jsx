import React, { useState } from "react";

/* ----------------------------------------------------------------------------------------------------- */
/*  @  <StepperController /> : Renders previous and next buttons
/* ----------------------------------------------------------------------------------------------------- */
const StepperController = ({
  goToPreviousStep,
  goToNextStep,
  disabledPrevious,
  disabledNext,
}) => {
  return (
    <div className="flex justify-between">
      {/* Button to navigate to the previous step */}
      <button
        onClick={() => goToPreviousStep()}
        className={`bg-black text-white p-2 rounded-lg font-semibold ${
          disabledPrevious && "opacity-50 cursor-not-allowed"
        }`}
        disabled={disabledPrevious}
      >
        Previous step
      </button>
      {/* Button to navigate to the next step */}
      <button
        onClick={() => goToNextStep()}
        className={`bg-black text-white p-2 rounded-lg font-semibold ${
          disabledNext && "opacity-50 cursor-not-allowed"
        }`}
        disabled={disabledNext}
      >
        Next step
      </button>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  <StepperComponent /> : Manages the state and renders the stepper UI
/* ----------------------------------------------------------------------------------------------------- */
const StepperComponent = ({
  labels,
  subLabels,
  showController = false,
  isVertical = false,
  currentStep, // Pass currentStep as a prop
  onStepChange, // Callback function to handle current step changes
}) => {
  const NUMBER_OF_STEPS = labels.length;

  // Function to navigate to the next step
  const goToNextStep = () => {
    onStepChange((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));
  };

  // Function to navigate to the previous step
  const goToPreviousStep = () => {
    onStepChange((prev) => (prev <= 0 ? prev : prev - 1));
  };

  // Stepper component renders the step indicators based on the mode (vertical or horizontal)
  const Stepper = ({ numberOfSteps, labels, subLabels }) => {
    const activeStep = (index) => currentStep >= index;

    return (
      <div className={`flex ${isVertical ? "flex-col" : "items-center"} p-8`}>
        {labels.map((label, index) =>
          isVertical ? (
            <React.Fragment key={index}>
              {/*Vertical stepper design */}
              <div className="flex items-center flex-col justify-center w-max">
                <div className="flex items-center flex-col relative">
                  <div
                    className={`absolute top-2 left-full ml-4 w-max ${
                      activeStep(index) ? "text-gray-400" : "text-green-500"
                    }`}
                  >
                    {/* <p className="text-xs font-medium">{subLabels[index]}</p> */}
                    <h6
                      className={`text-sm font-semibold ${
                        activeStep(index) ? "text-[#333]" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </h6>
                  </div>
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] border-2 ${
                      activeStep(index) ? "border-green-500" : "border-gray-300"
                    } p-1.5 flex items-center justify-center rounded-full`}
                  >
                    {activeStep(index) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full fill-green-500"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          data-original="#000000"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`w-3 h-3 ${
                          activeStep(index)
                            ? "bg-green-500 rounded-full"
                            : "bg-gray-300 rounded-full"
                        }`}
                      ></span>
                    )}
                  </div>
                  {index < numberOfSteps - 1 && (
                    <div
                      className={`w-1 h-16 ${
                        activeStep(index) ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              {/*Horizontal stepper design */}
              <div className="relative">
                <div
                  className={`w-8 h-8 shrink-0 mx-[-1px] border-2 ${
                    activeStep(index) ? "border-green-500" : "border-gray-300"
                  } p-1.5 flex items-center justify-center rounded-full`}
                >
                  {activeStep(index) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full fill-green-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        data-original="#000000"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`w-3 h-3 ${
                        activeStep(index)
                          ? "bg-green-500 rounded-full"
                          : "bg-gray-300 rounded-full"
                      }`}
                    ></span>
                  )}
                </div>
                <div
                  className={
                    activeStep(index) ? "text-gray-400" : "text-green-500"
                  }
                >
                  <div
                    className={`block absolute top-[-25px] left-[-50%] w-max text-sm font-semibold ${
                      activeStep(index) ? "text-[#333]" : "text-gray-400"
                    }`}
                  >
                    {labels[index]}
                  </div>
                </div>
                <div
                  className={
                    activeStep(index) ? "text-gray-400" : "text-green-500"
                  }
                >
                  {/* <div
                    className={`block absolute bottom-[-25px] left-[-100%] w-max text-xs font-medium tracking-tight ${
                      activeStep(index) ? "text-[#333]" : "text-gray-400"
                    }`}
                  >
                    {subLabels[index]}
                  </div> */}
                </div>
              </div>
              {index === numberOfSteps - 1 ? null : (
                <div
                  className={`w-4/12 h-1 ${
                    activeStep(index) ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
              )}
            </React.Fragment>
          )
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Render the stepper */}
      <Stepper
        numberOfSteps={NUMBER_OF_STEPS}
        labels={labels}
        // subLabels={subLabels}
      />
      {/* <br /> */}
      {/* Render the controller (previous and next buttons) if showController is true */}
      {showController && (
        <StepperController
          goToPreviousStep={goToPreviousStep}
          goToNextStep={goToNextStep}
          disabledPrevious={currentStep === 0}
          disabledNext={currentStep === NUMBER_OF_STEPS - 1}
        />
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  <HorizontalStepperComponent /> : isVertical value (false) : props > showController(false by default)
/* ----------------------------------------------------------------------------------------------------- */
const HorizontalStepperComponent = (props) => <StepperComponent {...props} />;
/* ----------------------------------------------------------------------------------------------------- */
/*  @  <VerticalStepperComponent /> : isVertical value (true) : props > showController(false by default)
/* ----------------------------------------------------------------------------------------------------- */
const VerticalStepperComponent = (props) => (
  <StepperComponent {...props} isVertical />
);

export { HorizontalStepperComponent, VerticalStepperComponent };
