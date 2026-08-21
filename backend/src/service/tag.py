from ..model.tag import Tag


class TagService:
	def __init__(self) -> None:
		self._tags: dict[str, Tag] = {}

	def create(self, tag: Tag) -> None:
		self._tags[tag.tag] = tag

	def get(self, tag_str: str) -> Tag:
		return self._tags[tag_str]


service = TagService()
