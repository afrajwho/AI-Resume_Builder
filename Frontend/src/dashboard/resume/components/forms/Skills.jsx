import { Input } from "@/components/ui/input";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
function Skills() {
  const initialRender = useRef(true);
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;

      if (resumeInfo?.skills?.length) {
        setSkillsList(resumeInfo.skills);
      }
    }
  }, [resumeInfo?.skills]);

  const handleChange = useCallback((index, name, value) => {
    setSkillsList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  }, []);

  const AddNewSkills = useCallback(() => {
    setSkillsList((prev) => [
      ...prev,
      {
        name: "",
        rating: 0,
      },
    ]);
  }, []);

  const RemoveSkills = useCallback(() => {
    setSkillsList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const onSave = useCallback(() => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList
          .filter((skill) => skill.name.trim() !== "")
          .map(({ id, ...rest }) => ({
            name: rest.name.trim(),
            rating: rest.rating || 0,
          })),
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        setLoading(false);
        setResumeInfo((prev) => ({
          ...prev,
          skills: data.data.skills,
        }));
        toast("Details updated!");
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        toast("Server Error, Try again!");
      });
  }, [skillsList, resumeId, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between mb-2 border rounded-lg p-3 ">
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            {" "}
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;