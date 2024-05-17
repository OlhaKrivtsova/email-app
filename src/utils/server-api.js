import {encode} from 'base-64';
const ROOT_DOMAIN = 'http://68.183.74.14:4005/api';

export async function addUser(userData) {
  const response = await fetch(`${ROOT_DOMAIN}/users/`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Registration error');
  }
  const data = await response.json();
  return data;
}

export async function authUser({login, password}) {
  const response = await fetch(`${ROOT_DOMAIN}/users/current/`, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + encode(login + ':' + password),
    },
  });

  if (!response.ok) {
    throw new Error('Authorization error');
  }

  const data = await response.json();
  return data;
}

export async function addEmail({emailData, login, password}) {
  const response = await fetch(`${ROOT_DOMAIN}/emails/`, {
    method: 'POST',
    body: JSON.stringify(emailData),
    headers: {
      Authorization: 'Basic ' + encode(login + ':' + password),
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Email sending error');
  }
  const data = await response.json();
  return data;
}

export async function getEmails({login, password, limit}) {
  const response = await fetch(
    `${ROOT_DOMAIN}/emails/?limit=${limit.toString()}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + encode(login + ':' + password),
      },
    }
  );

  if (!response.ok) {
    throw new Error('Email sending error');
  }
  const data = await response.json();
  return data;
}
