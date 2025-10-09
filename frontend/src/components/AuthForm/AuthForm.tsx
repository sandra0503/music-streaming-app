import { Anchor, Box, Button, FormField, Paragraph, TextInput } from 'grommet';
import { Form } from 'grommet/components/Form';
import { useState } from 'react';
import { login, signup } from '../../api';

type AuthFormProps = {
  onLogin: (token: string) => void;
};

function AuthForm({ onLogin }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await login({ email, password });
        const token = res.data.token;
        if (!token) throw new Error('No token returned');
        onLogin(token);
      } else {
        await signup({ email, password });
        setIsLogin(true);
        alert('Account created. Please log in.');
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.msg ||
        err?.response?.data ||
        err.message ||
        'Error';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box align="center" pad="large">
      <Form validate="blur">
        <Box gap="medium" pad="large" width="medium">
          <FormField htmlFor="email-id" name="email" label="Email Address">
            <TextInput
              id="email-id"
              name="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormField>
          <FormField htmlFor="password-id" name="password" label="Password">
            <TextInput
              id="password-id"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </FormField>
          <Button
            type="submit"
            label={isLogin ? 'Login' : 'Signup'}
            onClick={handleSubmit}
            disabled={loading}
          />
          <Paragraph margin="none">
            {isLogin ? 'No account?' : 'Have an account?'}{' '}
            <Anchor
              onClick={() => setIsLogin(!isLogin)}
              label={isLogin ? 'Sign up' : 'Log in'}
            />
          </Paragraph>
        </Box>
      </Form>
    </Box>
  );
}

export default AuthForm;
