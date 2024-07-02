import AuthSocialButton from '@/components/AuthSocialButton';
import Input from '@/components/inputs/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(255, { message: 'Password must be at most 255 characters long' }),
});

type LoginForm = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center px-6 pt-2 pb-6 mx-auto'>
        <div className='flex items-center mb-4 text-2xl font-semibold text-slate-100'>
          <img
            className='w-10 h-10 mr-2'
            src='/logos/logo-base-1200x1200.png'
            alt='logo'
          />
          <span>Login</span>
        </div>
        <div className='w-full rounded-lg shadow-xl border md:mt-0 sm:max-w-lg xl:p-0 bg-slate-900 border-slate-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-slate-100'>
              <span>Sign in to your account</span>
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 md:space-y-6'
            >
              <Input
                {...register('email')}
                id='email'
                type='email'
                label='Email'
                placeholder='name@company.com'
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className='text-sm text-rose-500'>
                  {errors.email.message}
                </span>
              )}
              <Input
                {...register('password')}
                id='password'
                type='password'
                label='Password'
                placeholder='••••••••'
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className='text-sm text-rose-500'>
                  {errors.password.message}
                </span>
              )}

              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border rounded focus:ring-1 border-slate-600 focus:outline-none focus:border'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-slate-300'>
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href='#'
                  className='text-sm font-medium text-slate-300 hover:underline text-primary-500'
                >
                  Forgot password?
                </a>
              </div>
              <button type='submit' className='btn w-full'>
                Login
              </button>

              {/* google auth */}
              <div className='mt-6'>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-slate-700' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='bg-slate-900 px-2 text-slate-500'>
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className='mt-6 flex gap-2'>
                  <AuthSocialButton icon={BsGithub} onclick={() => {}} />
                  <AuthSocialButton icon={BsGoogle} onclick={() => {}} />
                </div>
              </div>

              {/* change variant */}
              <p className='text-sm font-light text-slate-400'>
                <span className='mr-1.5'>Don't have an account yet?</span>
                <Link
                  to={'/signup'}
                  className='font-medium text-primary-600 hover:underline text-primary-500'
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;