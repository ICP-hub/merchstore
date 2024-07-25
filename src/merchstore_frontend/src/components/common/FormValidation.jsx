import { useState } from "react";

// Custom hook for form validation
const useFormValidation = (validationRules) => {
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};

    // Iterate through validation rules
    Object.entries(validationRules).forEach(([key, rules]) => {
      rules.forEach((rule) => {
        if (rule.required && !formData[key]) {
          errors[key] = "*This field is required";
        }

        if (rule.pattern && !rule.pattern.test(formData[key])) {
          errors[key] = rule.error || "Invalid format";
        }
      });
    });

    setValidationErrors(errors);
    return errors;
  };

  return { validationErrors, validateForm, setValidationErrors };
};

export default useFormValidation;
