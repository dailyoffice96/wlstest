package com.backend_semi.service;

import com.backend_semi.constant.Role;
import com.backend_semi.dto.NoticeRequest;
import com.backend_semi.dto.NoticeResponse;
import com.backend_semi.entity.Notice;
import com.backend_semi.entity.Member;
import com.backend_semi.entity.NoticeCategory;
import com.backend_semi.repository.MemberRepository;
import com.backend_semi.repository.NoticeCateoryRepository;
import com.backend_semi.repository.NoticeRepository;
import com.backend_semi.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeCateoryRepository noticeCategoryRepository;
    private final MemberRepository memberRepository;

    // 공지사항 등록
    public Long createNotice(String loginId, NoticeRequest request){
        Member member = memberRepository.findByLoginId(loginId)
                                        .orElseThrow(()-> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        if(member.getRole() != Role.ADMIN){
            throw new IllegalArgumentException("관리자만 공지사항을 작성할 수 있습니다.");
        }

        NoticeCategory noticeCategory = noticeCategoryRepository.findById(request.getNoticeCategoryId())
                                                                .orElseThrow(()-> new IllegalArgumentException("공지사항 카테고리를 찾을 수 없습니다!"));

        Notice notice = new Notice(
                noticeCategory,
                member,
                request.getTitle(),
                request.getContents(),
                request.getAttachmentUrl()
        );

        Notice savedNotice = noticeRepository.save(notice);

        return savedNotice.getNoticeId();
    }

    public void updateNotice(String loginId, Long noticeId, NoticeRequest request){
        Member member = memberRepository.findByLoginId(loginId)
                                        .orElseThrow(()->new IllegalArgumentException("회원을 찾을 수 없습니다!"));

        if(member.getRole() != Role.ADMIN){
            throw new IllegalArgumentException("관리자만 공지사항을 수정할 수 있습니다!");
        }

        Notice notice = noticeRepository.findById(noticeId)
                                        .orElseThrow(()-> new IllegalArgumentException("공지사항을 찾을 수 없습니다!"));

        NoticeCategory noticeCategory = noticeCategoryRepository.findById(request.getNoticeCategoryId())
                                                                .orElseThrow(()->new IllegalArgumentException("공지사항 카테고리를 찾을 수 없습니다!"));

        notice.updateNotice(
                noticeCategory,
                request.getTitle(),
                request.getContents(),
                request.getAttachmentUrl()
        );
    }
    // 공지사항 삭제
    public void deleteNotice(String loginId, Long noticeId){
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(()->new IllegalArgumentException("회원을 찾을 수 없습니다!"));

        if(member.getRole() != Role.ADMIN){
            throw new IllegalArgumentException("관리자만 공지사항을 삭제할 수 있습니다!");
        }
        Notice notice = noticeRepository.findById(noticeId)

                .orElseThrow(()-> new IllegalArgumentException("공지사항을 찾을 수 없습니다!"));

        noticeRepository.delete(notice);
    }

    // 전체 공지사항 조회
    @Transactional(readOnly = true)
    public List<NoticeResponse> getNoticeList(){
        return noticeRepository.findAllByOrderByCreatedAtDesc()
                                .stream()
                                .map(NoticeResponse::new)
                                .toList();
    }

    @Transactional(readOnly = true)
    public NoticeResponse getNotice(Long noticeId){
        Notice notice = noticeRepository.findById(noticeId)
                                        .orElseThrow(()->new IllegalArgumentException("공지사항을 찾을 수 없습니다."));

        return new NoticeResponse(notice);
    }

    // 카테고리별 공지사항 조회
    @Transactional(readOnly = true)
    public List<NoticeResponse> getNoticeListByCategory(Long noticeCategoryId){
        return noticeRepository.findByNoticeCategory_NoticeCategoryIdOrderByCreatedAtDesc(noticeCategoryId)
                                .stream()
                                .map(NoticeResponse::new)
                                .toList();
    }

    // 작성자별 공지사항 조회
    @Transactional(readOnly = true)
    public List<NoticeResponse> getNoticeListByMember(Long memberId){
        return noticeRepository.findByMember_MemberIdOrderByCreatedAtDesc(memberId)
                                .stream()
                                .map(NoticeResponse::new)
                                .toList();
    }
}
