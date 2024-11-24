'use client';

export const toggleDocumentAttribute = (attribute, value, remove, tag = 'html') => {
  if (document.body) {
    const element = document.getElementsByTagName(tag.toString())[0];
    const hasAttribute = element.getAttribute(attribute);
    if (remove && hasAttribute) element.removeAttribute(attribute);else element.setAttribute(attribute, value);
  }
};