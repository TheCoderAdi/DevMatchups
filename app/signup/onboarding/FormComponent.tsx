// FormComponent.tsx
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

// Define the schema using Zod
const schema = z.object({
    githubID: z.string().min(1, { message: 'Github ID is required' }),
    linkedinID: z.string().min(1, { message: 'LinkedIn ID is required' }),
    skills: z.array(z.string().min(1, { message: "Enter atleast 1 skill" })),
    role: z.string().min(1, { message: "Role is required" }),
    experience: z.string().min(1, { message: "Experience is required" }),
});

type FormData = z.infer<typeof schema>;

interface Option {
    value: string;
    label: string;
}
type SkillOptions = Option[];


const FormComponent: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
        reset();
    };
    const skillOptions: SkillOptions = [{ value: 'Javascript', label: 'Javascript' }, { value: 'Python', label: 'Python' }, { value: 'React JS', label: 'React JS' }, { value: 'Next JS', label: 'Next JS' }, { value: 'MongoDB', label: 'MongoDB' }, { value: 'SQL', label: 'SQL' }];

    const ExperienceOptions = [{ value: 'Beginner (0-1 years)', label: 'Beginner (0-1 years)' }, { value: 'Intermediate (1-2 years)', label: 'Intermediate (1-2 years)' }, { value: 'Expert (2+ years)', label: 'Expert (2+ years)' }];
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-between items-center gap-4 '>
            <div className=' flex gap-4 w-full mx-auto justify-center items-center '>
                <div className="flex flex-col text-lg ">
                    <Label htmlFor="githubID" className="block text-sm font-medium p-2">
                        Enter your GitHub username
                    </Label>
                    <div className=" flex relative items-center px-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none mb-1 ">
                            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                            <span className='ml-1 dark:text-gray-500 text-gray-700'>|</span>
                        </div>
                        <Input
                            id="githubID"
                            type="text"
                            className="block w-full dark:bg-gray-900 bg-gray-200 border-accent focus:border border-b-2 focus:border-accent rounded-full pl-14"
                            {...register("githubID", { required: true, min: 0 })}
                        />
                    </div>
                    {errors.githubID && <span className="error-message text-right flex justify-end items-center w-full text-sm mb-5 text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clip-rule="evenodd"></path>
                    </svg>{errors.githubID.message}</span>}

                </div>
                <div className="flex flex-col gap-6 text-lg ">
                    <div>
                        <Label htmlFor="linkedinID" className="block text-sm font-medium p-2 ">
                            Enter your LinkedIn username
                        </Label>
                        <div className="mt-1 flex relative items-center px-2">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none mb-1 ">
                                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <span className='ml-1 dark:text-gray-500 text-gray-700'>|</span>
                            </div>
                            <Input
                                id="linkedinID"
                                type="text"
                                className="block w-full dark:bg-gray-900 bg-gray-200 border-accent focus:border border-b-2 focus:border-accent  rounded-full pl-14"
                                {...register("linkedinID", { required: true, min: 0 })}
                            />
                        </div>
                        {errors.linkedinID && <span className="error-message text-right flex justify-end items-center w-full text-sm mb-5 text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                            <path fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clip-rule="evenodd"></path>
                        </svg>{errors.linkedinID.message}</span>}
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col w-full gap-2 text-lg ">
                <div className="flex flex-col text-lg ">
                        <Label htmlFor="role" className="block text-sm font-medium p-2">
                            What is your current role or area of work?
                        </Label>
                        <div className=" flex relative items-center px-2">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none mb-1 ">
                                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <span className='ml-1 dark:text-gray-500 text-gray-700'>|</span>
                            </div>
                            <Input
                                id="role"
                                type="text"
                                placeholder='Backend, Frontend, Devops etc...'
                                className="block w-full dark:bg-gray-900 bg-gray-200 border-accent focus:border border-b-2 focus:border-accent rounded-full pl-14"
                                {...register("role", { required: true, min: 0 })}
                            />
                        </div>
                        {errors.role && <span className="error-message text-right flex justify-end items-center w-full text-sm mb-5 text-red-500 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                            <path fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clip-rule="evenodd"></path>
                        </svg>{errors.role.message}</span>}

                </div>
            </div>

            <div className="flex flex-col w-full gap-2 text-lg ">
            <Label htmlFor="experience" >Experience level *</Label>
                        <Controller
                            name="experience"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={ExperienceOptions}
                                    value={ExperienceOptions.find((c) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    placeholder="Enter minimum experience level"
                                    id="experience"
                                    
                                    styles={{
                                        singleValue: base => ({ ...base, color: "white", paddingInline: "5px", }),
                                        valueContainer: base => ({
                                            ...base,
                                            color: "var(--text)",
                                            width: "100%",
                                            paddingInline: "5px",
                                            borderColor: "var(--primary)",
                                        }),
                                        control: (base, state) => ({
                                            ...base,
                                            color: "var(--text)",
                                            background: "var(--background)",
                                            borderRadius: "50px",
                                            textDecorationColor: "var(--text)"
                                        }),
                                        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                                            ...styles,
                                            backgroundColor:"var(--background)",
                                            color:"var(--text)",
                                            ":active": {
                                                ...styles[":active"],
                                                backgroundColor: "var(--secondary)"
                                            }
                                        }),
                                        multiValue: (styles, { data }) => ({
                                            ...styles,
                                            backgroundColor: "var(--secondary)",
                                            borderRadius: "20px", // the bg color behind icon
                                            padding: "5px"
                                        }),
                                        multiValueLabel: styles => ({
                                            ...styles,
                                            color: "var(--text)", // label text color
                                            background: "var(--secondary)", // label bg behind selected
                                            borderEndStartRadius: "20px",
                                            borderTopLeftRadius: "20px",
                                        }),
                                        multiValueRemove: styles => ({
                                            ...styles,
                                            color: "var(--text)",
                                            ":hover": {
                                                backgroundColor: "var(--secondary)", // on hover x bg color
                                                color: "var(--text)", // on hover x icon color
                                                borderRadius: "20px",
                                            }
                                        })
                                    }}
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            neutral30: "", // control/borderColor(focused)
                                            neutral50: "var(--accent)", // placeholder color
                                            neutral80: "var(--text)", // input color
                                            primary25: "", // option bg color focused
                                            primary: "", // option bg color selected
                                            primary50: "" // option bg color active (enabled or available)
                                        }
                                    })}
                                />
                            )}
                            rules={{ required: true }}
                        />
            </div>

            <div className="flex flex-col w-full gap-2 text-lg ">
                <Label htmlFor="skills" >Add some skills *</Label>
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => (
                            <CreatableSelect
                                isMulti
                                options={skillOptions}
                                value={field.value?.map(skill => ({ value: skill, label: skill })) || []}
                                onChange={val => field.onChange(val.map(v => v.value))}
                                placeholder="Search for a skill..."
                                id="skills"
                                
                                styles={{
                                    singleValue: base => ({ ...base, color: "#154b79", }),
                                    valueContainer: base => ({
                                        ...base,
                                        color: "var(--text)",
                                        width: "100%",
                                        borderColor: "var(--inputGray)",
                                    }),
                                    control: (base, state) => ({
                                        ...base,
                                        color: "var(--text)",
                                        background: "var(--background)",
                                        borderRadius: "50px",
                                        textDecorationColor: "var(--text)"
                                    }),
                                    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                                        ...styles,
                                        backgroundColor:"var(--inputGray)",
                                        color:"var(--text)",
                                        ":active": {
                                            ...styles[":active"],
                                            backgroundColor: "var(--secondary)"
                                        }
                                    }),
                                    multiValue: (styles, { data }) => ({
                                        ...styles,
                                        backgroundColor: "var(--secondary)",
                                        borderRadius: "20px", // the bg color behind icon
                                        padding: "5px"
                                    }),
                                    multiValueLabel: styles => ({
                                        ...styles,
                                        color: "var(--text)", // label text color
                                        background: "var(--secondary)", // label bg behind selected
                                        borderEndStartRadius: "20px",
                                        borderTopLeftRadius: "20px",
                                    }),
                                    multiValueRemove: styles => ({
                                        ...styles,
                                        color: "var(--text)",
                                        ":hover": {
                                            backgroundColor: "var(--secondary)", // on hover x bg color
                                            color: "var(--text)", // on hover x icon color
                                            borderRadius: "20px",
                                        }
                                    })
                                }}
                                theme={theme => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        neutral30: "", // control/borderColor(focused)
                                        neutral50: "var(--accent)", // placeholder color
                                        neutral80: "var(--text)", // input color
                                        primary25: "", // option bg color focused
                                        primary: "", // option bg color selected
                                        primary50: "" // option bg color active (enabled or available)
                                    }
                                })}
                            />
                        )}
                        rules={{ required: true }}
                    />
            </div>


            <Button type="submit" className="mt-4 w-full bg-primary dark:bg-secondary dark:hover:bg-slate-900/90 text-white dark:text-white " >
                Lets Go
            </Button>
        </form>
    );
};

export default FormComponent;
